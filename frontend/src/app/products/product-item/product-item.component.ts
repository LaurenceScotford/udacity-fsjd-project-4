import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { CartItem } from '../../cart/cart.models';
import { Product } from '../products.models';
import { selectItemQuantity } from 'src/app/cart/cart.selectors';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() product: Product;
  quantity: string;
  @Output() addToCartEvent = new EventEmitter<CartItem>();
  inCart: number;
  inCartSub: Subscription | null | undefined;

  constructor(private store: Store) {
    this.product = {
      id: '0',
      name: '',
      price: 0.00,
      url: '',
      description: ''
    };
    this.quantity = '1';
    this.inCart = 0;
  }

  ngOnInit(): void {
    this.inCartSub = this.store.select(selectItemQuantity(this.product.id))
      .subscribe(numInCart => this.inCart = numInCart);
  }

  ngOnDestroy(): void {
    this.inCartSub?.unsubscribe();
    this.inCartSub = null;
  }

  addToCart() {
    this.addToCartEvent.emit({
      product_id: this.product.id,
      quantity: parseInt(this.quantity)
    });
  }
}
