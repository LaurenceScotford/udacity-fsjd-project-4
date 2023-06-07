import * as fromProducts from './products.reducer';
import * as fromActions from './products.actions';
import { Product, ProductsState } from './products.models';

describe('AuthReducer', () => {

    const { initialState } = fromProducts;

    it('should set a status of "loading" when the Load Products action is dispatched', () => {

        const statusString: ProductsState['status'] = 'loading';
        const action = fromActions.loadProducts;
        const state = fromProducts.productsReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            status: statusString
        });
    });

    it('should set a list of products and a status of "loading" when the Products Loaded action is dispatched', () => {

        const statusString: ProductsState['status'] = 'success';
        const products: Product[] = [
            {
                id: 'id',
                name: 'name',
                price: 0.01,
                url: 'url',
                description: 'description'
            }
        ];
        const action = fromActions.productsLoaded({ products });
        const state = fromProducts.productsReducer(initialState, action);

        expect(state.status).toBe(statusString);
        expect(Object.values(state.entities)).toEqual(products);
    });

    it('should set a status of "error" when the Load Products Failed action is dispatched', () => {

        const statusString: ProductsState['status'] = 'error';
        const newState: ProductsState = {
            ...initialState,
            status: 'success'
        }
        const action = fromActions.loadProductsFailed;
        const state = fromProducts.productsReducer(newState, action);

        expect(state).toEqual({
            ...initialState,
            status: statusString
        });
    });

});