import * as fromActions from './products.actions';
import { Product } from './products.models';

describe('Products Actions', () => {
    it('should create the Load Products action', () => {
        const action = fromActions.loadProducts();

        expect(action).toEqual({
            type: '[products] Load Products'
        });
    });

    it('should create the Products Loaded action', () => {
        const payload: Product[] = [
            {
                id: 'id',
                name: 'name',
                price: .01,
                url: 'url',
                description: 'description'
            }
        ];

        const action = fromActions.productsLoaded({ products: payload });

        expect(action).toEqual({
            type: '[products] Products Loaded',
            products: payload
        });
    });

    it('should create the Load Products Failed action', () => {
        const action = fromActions.loadProductsFailed();

        expect(action).toEqual({
            type: '[products] Load Products Failed'
        });
    });
});