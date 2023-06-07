import { createAction, props } from '@ngrx/store';
import { CartItem } from '../cart/cart.models';
import { Product } from './products.models';

const key = '[products]';

export const loadProducts = createAction(`${key} Load Products`);

export const productsLoaded = createAction(
    `${key} Products Loaded`,
    props<{
        products: Product[]
    }>()
);

export const loadProductsFailed = createAction(`${key} Load Products Failed`);
