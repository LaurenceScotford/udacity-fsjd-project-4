import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { Product } from '../products.models';
import { CartItem } from '../../cart/cart.models';
import * as productsActions from '../products.actions';
import * as cartActions from '../../cart/cart.actions'
import { selectProductList, selectProductsStatus } from '../products.selectors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]> = this.store.pipe(select(selectProductList));
  productsStatusSubscription: Subscription | null | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.productsStatusSubscription = this.store.select(selectProductsStatus).subscribe(status => {
      if (status !== 'success') {
        this.store.dispatch(productsActions.loadProducts());
      }
    });
  }

  ngOnDestroy(): void {
    this.productsStatusSubscription?.unsubscribe();
    this.productsStatusSubscription = null;
  }

  addToCart(cartItem: CartItem): void {
    this.store.dispatch(cartActions.addProductToCart({ cartItem: cartItem }));
  }
}
