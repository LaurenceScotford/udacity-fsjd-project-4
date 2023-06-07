import * as fromOrder from './order.reducer';
import * as fromActions from './order.actions';
import { Order } from './order.models';

interface mockCurrentOrder {
    current_order: Order;
}

describe('Order Reducer', () => {
    const { initialState } = fromOrder;

    it('should set the current order when the Get Order Success action is dispatched', () => {
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
        const state = fromOrder.orderReducer(initialState, action);

        expect(state).toEqual(payload);
    });
});