import { createFeatureSelector, createSelector } from "@ngrx/store";

import { Order, OrderProduct, OrderState } from "./order.models";
import { selectProductList } from "../products/products.selectors";
import { CartItem } from "../cart/cart.models";
import { Product } from "../products/products.models";

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const selectCurrentOrder = createSelector(
    selectOrderState,
    (state: OrderState) => state.current_order
);

export const selectCartItemsInOrder = createSelector(
    selectOrderState,
    selectCurrentOrder,
    (_state: OrderState, currentOrder: Order | null) => currentOrder?.products
);

export const selectOrderProducts = createSelector(
    selectOrderState,
    selectCartItemsInOrder,
    selectProductList,
    (_state: OrderState, items?: CartItem[], products?: Product[]) => {
        const productList: OrderProduct[] = [];
        if (items) {
            for (let item of items) {
                const product = products?.find(product => product.id == item.product_id);
                if (product) {
                    productList.push({
                        name: product.name,
                        quantity: item.quantity
                    });
                }
            }
        }
        return productList;
    }
);

export const selectOrderTotal = createSelector(
    selectOrderState,
    selectCartItemsInOrder,
    selectProductList,
    (_state: OrderState, items?: CartItem[], products?: Product[]) => {
        let total = 0;
        if (items) {
            for (let item of items) {
                const product = products?.find(product => product.id == item.product_id);
                if (product) {
                    total += item.quantity * product.price;
                }
            }
        }
        return total;
    }
);

export const selectOrderDateTime = createSelector(
    selectOrderState,
    selectCurrentOrder,
    (_state: OrderState, currentOrder: Order | null) => currentOrder?.date_time
);