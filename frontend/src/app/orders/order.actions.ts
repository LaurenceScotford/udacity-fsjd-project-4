import { createAction, props } from '@ngrx/store';
import { Order } from './order.models';

const key = '[order]';

export const createOrder = createAction(
    `${key} Create Order`,
    props<{
        order: Order
    }>()
);

export const createOrderSuccess = createAction(
    `${key} Order Success`,
    props<{
        id: string
    }>()
);

export const createOrderFailure = createAction(`${key} Order Failure`);

export const getOrder = createAction(
    `${key} Get Order`,
    props<{
        id: string
    }>()
);

export const getOrderSuccess = createAction(
    `${key} Get Order Success`,
    props<{
        current_order: Order
    }>()
);

export const getOrderFailure = createAction(`${key} Get Order Failure`);
