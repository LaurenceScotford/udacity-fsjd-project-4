import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CartState } from "./cart.models";
import { selectProductList } from "../products/products.selectors";

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
    selectCartState,
    (state: CartState) => state.cartItems
);

export const selectItemQuantity = (id: string) => createSelector(
    selectCartState,
    (state: CartState) => {
        let quantity = 0;
        const itemMatch = state.cartItems.find(item => item.product_id === id);
        if (itemMatch) {
            quantity = itemMatch.quantity;
        }
        return quantity;
    },
);

export const selectCartHasItems = createSelector(
    selectCartState,
    (state: CartState) => state.cartItems.length > 0
);

export const selectCartTotal = createSelector(
    selectCartState,
    selectProductList,
    (state: CartState, products) => {
        let total = 0;
        for (let item of state.cartItems) {
            const product = products.find(product => product.id == item.product_id);
            if (product) {
                total += item.quantity * product.price;
            }
        }
        return total;
    }
);