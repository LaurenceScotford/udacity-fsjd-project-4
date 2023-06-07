import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartItem } from '../cart.models';
import { Product } from 'src/app/products/products.models';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectProduct } from '../../products/products.selectors';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input() item: CartItem;
  @Output() quantityChangeEvent = new EventEmitter<CartItem>();
  product: Product | undefined;
  productSub: Subscription | null | undefined;
  newQuantity: number;

  constructor(private store: Store) {
    this.item = {
      product_id: '',
      quantity: 1
    }
    this.newQuantity = 0;
  }

  ngOnInit(): void {
    this.newQuantity = this.item.quantity;
    this.productSub = this.store.select(selectProduct(this.item.product_id))
      .subscribe(product => this.product = product);
  }

  onQuantityChange() {
    this.quantityChangeEvent.emit({ product_id: this.item.product_id, quantity: this.newQuantity });
  }

}
