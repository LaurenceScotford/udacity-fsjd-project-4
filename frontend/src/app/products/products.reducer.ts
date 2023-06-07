import {
    createReducer,
    on
} from '@ngrx/store';

import { ProductsState, adapter } from './products.models';
import * as ProductsActions from './products.actions';

export const productsFeatureKey = 'products';

export const initialState: ProductsState = adapter.getInitialState({
    selectedProductId: null,
    status: 'pending'
});

export const productsReducer = createReducer(
    initialState,
    on(
        ProductsActions.loadProducts,
        (state, _action) => {
            return {
                ...state,
                status: 'loading'
            }
        }
    ),
    on(
        ProductsActions.productsLoaded,
        (state, action) => {
            return adapter.setAll(action.products, { ...state, status: 'success' });
        }
    ),
    on(
        ProductsActions.loadProductsFailed,
        (state, action) => {
            return {
                ...state,
                status: 'error'
            }
        }
    )
);
