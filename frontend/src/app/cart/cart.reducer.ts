import {
    createReducer,
    on
} from '@ngrx/store';

import { CartState, CartItem } from './cart.models';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export const initialState: CartState = {
    cartItems: []
};

export const cartReducer = createReducer(
    initialState,
    on(
        CartActions.addProductToCart,
        (state, action) => {
            // See if the item already exists in cart, 
            // and if so add the new quantity to the existing item ...
            let found = false;
            const newItem = action.cartItem;
            const newItems = state.cartItems.map((cartItem: CartItem) => {
                if (cartItem.product_id === newItem.product_id) {
                    found = true;
                    return { ...cartItem, quantity: cartItem.quantity + newItem.quantity };
                } else {
                    return { ...cartItem };
                }
            })
            if (found) {
                return {
                    ...state,
                    cartItems: newItems
                }
            } else {
                // ...otherwise, append the new item to the cart
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.cartItem]
                }
            }
        }
    ),
    on(
        CartActions.updateItem,
        (state, action) => {
            // Find item in cart and update it
            const newItem = action.cartItem;
            let newItems;
            // If quantity has been changed to 0, remove that item from the cart...
            if (newItem.quantity === 0) {
                newItems = state.cartItems.filter(
                    item => item.product_id !== newItem.product_id
                );
            } else {
                // ...otherwise, update it with the new quantity 
                newItems = state.cartItems.map(
                    item => item.product_id === newItem.product_id ? newItem : item
                );
            }

            return {
                ...state,
                cartItems: newItems
            }
        }
    ),
    on(
        CartActions.setCart,
        (state, action) => {
            return {
                ...state,
                cartItems: action.cartItems
            }
        }
    ),
    on(
        CartActions.emptyCart,
        (state, action) => {
            return {
                ...state,
                cartItems: []
            }
        }
    )
);