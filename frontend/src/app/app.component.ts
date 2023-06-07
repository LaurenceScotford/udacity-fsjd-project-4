import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { selectCartHasItems } from './cart/cart.selectors';
import { LocalStorageService } from './services/local-storage.service';
import { CartItem, cartLocalStorageName } from './cart/cart.models';
import * as CartActions from './cart/cart.actions';
import { AuthUser, authLocalStorageName } from './auth/auth.models';
import { selectUser, selectIsLoggedIn } from './auth/auth.selectors';
import * as AuthActions from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'udacity-fsjd-project-3';
  currentRoute = 'product-list';
  routerSub$: Subscription | null | undefined;
  cartSub$: Subscription | null | undefined;
  cartHasItems: boolean;
  isLoggedIn: boolean;
  loggedInSub$: Subscription | null | undefined;
  username: string | null;
  userNameSub$: Subscription | null | undefined;

  constructor(
    private router: Router,
    private store: Store,
    private localStorageService: LocalStorageService
  ) {
    this.cartHasItems = false;
    this.isLoggedIn = false;
    this.username = null;
  }

  ngOnInit(): void {
    // Subscription to detect route changes (so we can update active link in nav bar)
    this.routerSub$ = this.router.events
      .subscribe(event => (event instanceof NavigationEnd) && this.updateNav());

    // Subscription to show active cart icon when cart has items in it
    this.cartSub$ = this.store.select(selectCartHasItems)
      .subscribe(hasitems => this.cartHasItems = hasitems);

    // Subscription to determine if user is logged in
    this.loggedInSub$ = this.store.select(selectIsLoggedIn)
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);

    // Subscription to get username
    this.userNameSub$ = this.store.select(selectUser)
      .subscribe(username => this.username = username);

    // Attempt to rehydrate user from local storage
    const rehydratedUser = this.localStorageService.rehydrate(authLocalStorageName) as AuthUser;
    if (rehydratedUser) {
      this.store.dispatch(AuthActions.autoLogin());
    }

    // Attempt to rehydrate cart from local storage
    const rehydratedCart = this.localStorageService.rehydrate(cartLocalStorageName);
    if (rehydratedCart) {
      this.store.dispatch(CartActions.setCart({ cartItems: rehydratedCart as CartItem[] }));
    }
  }

  ngOnDestroy(): void {
    this.routerSub$?.unsubscribe();
    this.routerSub$ = null;
    this.cartSub$?.unsubscribe();
    this.cartSub$ = null;
    this.loggedInSub$?.unsubscribe();
    this.loggedInSub$ = null;
    this.userNameSub$?.unsubscribe();
    this.userNameSub$ = null;
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  // After navigation set current route to show active link in nav bar
  updateNav() {
    const routeStrings = ['product-list', 'cart', 'login', 'register'];
    const newUrl = this.router.url;

    for (let routeString of routeStrings) {
      if (newUrl.includes(routeString)) {
        this.currentRoute = routeString;
        break;
      }
    }
  }

}
