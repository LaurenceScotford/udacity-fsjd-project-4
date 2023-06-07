import * as fromCart from './cart.reducer';
import * as fromActions from './cart.actions';

describe('CartReducer', () => {
    const { initialState } = fromCart;

    it('should add a new product to the cart if it does not exist when the Add Product to Cart action is dispatched', () => {
        const payload = {
            cartItem: {
                product_id: 'product_id',
                quantity: 1
            }
        };

        const action = fromActions.addProductToCart(payload);
        const state = fromCart.cartReducer(initialState, action);

        expect(state.cartItems.length).toBe(1);

        expect(state).toEqual({
            ...initialState,
            cartItems: [
                payload.cartItem
            ]
        });
    });

    it('should update the quantity of an existing product if it does exist when the Add Product to Cart action is dispatched', () => {
        const product_id = 'product_id';

        const newState = {
            cartItems: [
                {
                    product_id: product_id,
                    quantity: 1
                }
            ]
        }

        const payload = {
            cartItem: {
                product_id: product_id,
                quantity: 2
            }
        };

        const action = fromActions.addProductToCart(payload);
        const state = fromCart.cartReducer(newState, action);

        expect(state.cartItems.length).toBe(1);

        expect(state).toEqual({
            ...initialState,
            cartItems: [
                {
                    product_id: product_id,
                    quantity: 3
                }
            ]
        });
    });

    it('should remove an item from the cart if Update Item is dispatched with a quantity of 0', () => {
        const product_id = 'product_id';

        const newState = {
            cartItems: [
                {
                    product_id: product_id,
                    quantity: 1
                }
            ]
        }

        const payload = {
            cartItem: {
                product_id: product_id,
                quantity: 0
            }
        };

        const action = fromActions.updateItem(payload);
        const state = fromCart.cartReducer(newState, action);

        expect(state.cartItems.length).toBe(0);
    });

    it('should update the quantity of an item in the cart if Update Item is dispatched with a non-zero quantity', () => {
        const product_id = 'product_id';

        const newState = {
            cartItems: [
                {
                    product_id: product_id,
                    quantity: 1
                }
            ]
        }

        const payload = {
            cartItem: {
                product_id: product_id,
                quantity: 2
            }
        };

        const action = fromActions.updateItem(payload);
        const state = fromCart.cartReducer(newState, action);

        expect(state).toEqual({
            ...initialState,
            cartItems: [
                payload.cartItem
            ]
        });
    });

    it('should update the entire cart if the Set Cart action is dispatched', () => {
        const newState = {
            cartItems: [
                {
                    product_id: 'old_product_id',
                    quantity: 2
                }
            ]
        }

        const payload = {
            cartItems: [
                {
                    product_id: 'product_id_1',
                    quantity: 1
                },
                {
                    product_id: 'product_id_2',
                    quantity: 3
                },
            ]
        };

        const action = fromActions.setCart(payload);
        const state = fromCart.cartReducer(newState, action);

        expect(state).toEqual(payload);
    });

    it('should clear the cart when the empty cart action is dispatched', () => {
        const newState = {
            cartItems: [
                {
                    product_id: 'product_id',
                    quantity: 2
                }
            ]
        }

        const action = fromActions.emptyCart({
            showMessage: false
        });
        const state = fromCart.cartReducer(newState, action);

        expect(state.cartItems.length).toBe(0);
    });

});
