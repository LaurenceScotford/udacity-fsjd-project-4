import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { CartItem } from '../cart.models';
import * as cartActions from '../cart.actions'
import { createOrder } from '../../orders/order.actions'
import { selectCartItems, selectCartTotal } from '../cart.selectors';
import { selectIsLoggedIn } from 'src/app/auth/auth.selectors';
import { Order } from 'src/app/orders/order.models';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItemsSub: Subscription | null | undefined;
  cartItems: CartItem[] = [];
  cartTotal = '0.00';
  cartTotalSub: Subscription | null | undefined;
  fullname = '';
  addr = '';
  cardnum = '';
  isLoggedIn = false;
  isLoggedInSub: Subscription | null | undefined;

  constructor(private store: Store, private authService: AuthService) { }

  ngOnInit(): void {
    // Subscription to get cart items
    this.cartItemsSub = this.store.select(selectCartItems)
      .subscribe(items => this.cartItems = items);
    // Subscription to get total cost of items in cart
    this.cartTotalSub = this.store.select(selectCartTotal)
      .subscribe(total => this.cartTotal = total.toFixed(2));
    // Subscription to check if user is logged in
    this.isLoggedInSub = this.store.select(selectIsLoggedIn)
      .subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  ngOnDestroy(): void {
    this.cartItemsSub?.unsubscribe();
    this.cartItemsSub = null;
    this.cartTotalSub?.unsubscribe();
    this.cartTotalSub = null;
    this.isLoggedInSub?.unsubscribe();
    this.isLoggedInSub = null;
  }

  onQuantityChange(item: CartItem): void {
    this.store.dispatch(cartActions.updateItem({ cartItem: item }));
  }

  onEmptyCart(): void {
    this.store.dispatch(cartActions.emptyCart({ showMessage: true }));
  }

  onSubmitOrder(): void {

    const order: Order = {
      user_id: this.authService.getUserId(),
      recipient_name: this.fullname,
      delivery_address: this.addr,
      date_time: Date.now(),
      products: this.cartItems,
      status: 'active'
    }
    this.store.dispatch(createOrder({ order }));
  }
}
