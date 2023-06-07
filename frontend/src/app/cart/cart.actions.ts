import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.models';

const key = '[cart]';

export const addProductToCart = createAction(
    `${key} Add Product To Cart`,
    props<{
        cartItem: CartItem
    }>()
);

export const updateItem = createAction(
    `${key} Update Item`,
    props<{
        cartItem: CartItem
    }>()
);

export const setCart = createAction(
    `${key} Set Cart`,
    props<{
        cartItems: CartItem[]
    }>()
);

export const emptyCart = createAction(
    `${key} Empty Cart`,
    props<{
        showMessage: boolean
    }>()
);

export const noAction = createAction(`${key} No Action`);
