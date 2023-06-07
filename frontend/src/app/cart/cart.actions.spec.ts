import * as fromActions from './cart.actions';

describe('Cart Actions', () => {
    it('should create the Add Product To Cart action', () => {
        const payload = {
            cartItem: {
                product_id: 'product_id',
                quantity: 1
            }
        };

        const action = fromActions.addProductToCart(payload);

        expect(action).toEqual({
            type: '[cart] Add Product To Cart',
            ...payload
        });
    });

    it('should create the Update Item action', () => {
        const payload = {
            cartItem: {
                product_id: 'product_id',
                quantity: 1
            }
        };

        const action = fromActions.updateItem(payload);

        expect(action).toEqual({
            type: '[cart] Update Item',
            ...payload
        });
    });

    it('should create the Set Cart action', () => {
        const payload = {
            cartItems: [
                {
                    product_id: 'product_id',
                    quantity: 1
                }
            ]
        };

        const action = fromActions.setCart(payload);

        expect(action).toEqual({
            type: '[cart] Set Cart',
            ...payload
        });
    });

    it('should create the Empty Cart action', () => {
        const payload = {
            showMessage: false
        };

        const action = fromActions.emptyCart(payload);

        expect(action).toEqual({
            type: '[cart] Empty Cart',
            ...payload
        });
    });

    it('should create the No Action action', () => {
        const action = fromActions.noAction();

        expect(action).toEqual({
            type: '[cart] No Action'
        });
    });
});