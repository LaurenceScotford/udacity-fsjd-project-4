import * as fromActions from './order.actions';
import { Order } from './order.models';

interface mockOrder {
    order: Order;
}

interface mockCurrentOrder {
    current_order: Order;
}

describe('Order Actions', () => {
    it('should create a Create Order action', () => {
        const payload: mockOrder = {
            order: {
                user_id: 'user_id',
                recipient_name: 'recipient_name',
                delivery_address: 'delivery_address',
                date_time: 1,
                products: [
                    {
                        product_id: 'product_id',
                        quantity: 1
                    }
                ],
                status: 'active'
            }

        };

        const action = fromActions.createOrder(payload);
        expect(action).toEqual({
            type: '[order] Create Order',
            ...payload
        });
    });

    it('should create an Order Success action', () => {
        const payload = {
            id: 'id'
        };

        const action = fromActions.createOrderSuccess(payload);

        expect(action).toEqual({
            type: '[order] Order Success',
            ...payload
        });
    });

    it('should create an Order Failure action', () => {

        const action = fromActions.createOrderFailure();

        expect(action).toEqual({
            type: '[order] Order Failure'
        });
    });

    it('should create a Get Order action', () => {
        const payload = {
            id: 'id'
        };

        const action = fromActions.getOrder(payload);
        expect(action).toEqual({
            type: '[order] Get Order',
            ...payload
        });
    });

    it('should create a Get Order Success action', () => {
        const payload: mockCurrentOrder = {
            current_order: {
                id: 'id',
                user_id: 'user_id',
                recipient_name: 'recipient_name',
                delivery_address: 'delivery_address',
                date_time: 1,
                products: [
                    {
                        product_id: 'product_id',
                        quantity: 1
                    }
                ],
                status: 'active'
            }
        };

        const action = fromActions.getOrderSuccess(payload);
        expect(action).toEqual({
            type: '[order] Get Order Success',
            ...payload
        });
    });

    it('should create a Get Order Failure action', () => {

        const action = fromActions.getOrderFailure();

        expect(action).toEqual({
            type: '[order] Get Order Failure'
        });
    });
});