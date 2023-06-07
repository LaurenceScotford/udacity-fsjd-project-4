import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { EMPTY, map } from "rxjs";

import { setMessage } from "../message/message.actions";
import * as fromActions from './cart.actions';
import { Store } from "@ngrx/store";
import { selectProduct } from "../products/products.selectors";
import { selectCartItems } from "./cart.selectors";
import { LocalStorageService } from "../services/local-storage.service";
import { cartLocalStorageName } from "./cart.models";


@Injectable()
export class CartEffects {
    constructor(
        private actions$: Actions,
        private store: Store,
        private localStorageService: LocalStorageService
    ) { }

    addProductToCart$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.addProductToCart),
            concatLatestFrom(
                action => this.store.select(selectProduct(action.cartItem.product_id))
            ),
            map(([action, product]) => {
                return setMessage({
                    message: `${action.cartItem.quantity} x ${product?.name} added to cart`,
                    messageType: 'confirm'
                });
            })
        )
    );

    updateCartItem$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.updateItem),
            concatLatestFrom(
                action => this.store.select(selectProduct(action.cartItem.product_id))
            ),
            map(([action, product]) => {
                const newQuantity = action.cartItem.quantity;
                let message;
                if (newQuantity === 0) {
                    message = `${product?.name} removed from cart`
                } else {
                    message = `Quantity of ${product?.name} in cart changed to ${newQuantity}`
                }
                return setMessage({
                    message: message,
                    messageType: 'confirm'
                });
            })
        )
    );

    emptyCart$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.emptyCart),
            map(action => {
                if (action.showMessage) {
                    return setMessage({
                        message: 'The cart was emptied',
                        messageType: 'confirm'
                    });
                }
                return fromActions.noAction();
            })
        )
    );

    // Whenever the cart state has changed - save it to local storage
    saveCartState$ = createEffect(
        () => this.actions$.pipe(
            ofType(fromActions.addProductToCart, fromActions.updateItem, fromActions.emptyCart),
            concatLatestFrom(
                () => this.store.select(selectCartItems)
            ),
            map(
                ([_action, cartItems]) => {
                    this.localStorageService.save(cartLocalStorageName, cartItems);
                }
            )
        ),
        { dispatch: false }
    );
}