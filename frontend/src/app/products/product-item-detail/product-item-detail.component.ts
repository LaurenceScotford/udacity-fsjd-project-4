import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../cart/cart.models';
import { Product, ProductsState } from '../products.models';
import { Store } from '@ngrx/store';
import { selectProduct } from '../products.selectors';
import * as CartActions from '../../cart/cart.actions';
import { Subscription } from 'rxjs';
import { selectItemQuantity } from 'src/app/cart/cart.selectors';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  quantity: string;
  productSub: Subscription | null | undefined;
  inCart: number;
  inCartSub: Subscription | null | undefined;

  constructor(
    private store: Store<ProductsState>,
    private route: ActivatedRoute
  ) {
    this.quantity = '1';
    this.inCart = 0;
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    // Subscription to get product
    this.productSub = this.store.select(selectProduct(id))
      .subscribe(product => this.product = product);

    // Subscription to get number of items in cart
    this.inCartSub = this.store.select(selectItemQuantity(id))
      .subscribe(numInCart => this.inCart = numInCart);
  }

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.productSub = null;
    this.inCartSub?.unsubscribe();
    this.inCartSub = null;
  }

  addToCart(): void {
    if (this.product) {
      let item: CartItem = {
        product_id: this.product.id,
        quantity: parseInt(this.quantity)
      }
      this.store.dispatch(CartActions.addProductToCart({ cartItem: item }));
    }
  }
}
