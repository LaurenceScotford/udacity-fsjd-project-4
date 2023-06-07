import {
    createReducer,
    on
} from '@ngrx/store';

import { OrderState, Order } from './order.models';
import * as OrderActions from './order.actions';

export const orderFeatureKey = 'order';

export const initialState: OrderState = {
    current_order: null
};

export const orderReducer = createReducer(
    initialState,
    on(
        OrderActions.getOrderSuccess,
        (state, action) => ({
            ...state,
            current_order: action.current_order
        })
    )
);