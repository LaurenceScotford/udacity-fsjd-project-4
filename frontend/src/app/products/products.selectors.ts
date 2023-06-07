import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProductsState, adapter } from './products.models';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const {
    selectAll,
    selectEntities
} = adapter.getSelectors();

export const selectProduct = (id: string) => createSelector(
    selectProductsState,
    (state: ProductsState) => selectEntities(state)[id],
);

export const selectProductList = createSelector(
    selectProductsState,
    (state: ProductsState) => selectAll(state)
);

export const selectSelectedProductId = createSelector(
    selectProductsState,
    (state: ProductsState) => state.selectedProductId
);

export const selectProductsStatus = createSelector(
    selectProductsState,
    (state: ProductsState) => state.status
)