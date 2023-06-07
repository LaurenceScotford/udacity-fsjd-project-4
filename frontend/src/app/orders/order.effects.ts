import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of, retry } from "rxjs";

import * as fromActions from './order.actions';
import { OrderService } from "./order.service";
import { setMessage } from "../message/message.actions";
import { emptyCart } from "../cart/cart.actions";

@Injectable()
export class OrderEffects {
    constructor(
        private actions$: Actions,
        private orderService: OrderService,
        private router: Router,
    ) { }

    createOrder$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.createOrder),
        exhaustMap((action) => this.orderService.createOrder(action.order)
            .pipe(
                retry(3),
                map((order) => fromActions.createOrderSuccess({ id: order.id as string })),
                catchError((e) => {
                    console.error(`Create order failed with error: ${e.message}`);
                    return of(fromActions.createOrderFailure());
                })
            )
        )
    ));

    createOrderFailure$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.createOrderFailure),
        map(() => setMessage({
            message: 'Sorry, we are unable to complete your order at this time! Please try again later...',
            messageType: 'warn'
        }))
    ));

    createOrderSuccessClearCart$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.createOrderSuccess),
        map(() => emptyCart({ showMessage: false }))
    ));

    createOrderSuccessReroute$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.createOrderSuccess),
        map(order => {
            this.router.navigate([`/confirm-order/${order.id}`]);
            return setMessage({
                message: 'Your order was successful!',
                messageType: 'confirm'
            });
        })
    ));

    getOrder$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.getOrder),
        exhaustMap(action => this.orderService.getOrder(action.id)
            .pipe(
                retry(3),
                map((order) => fromActions.getOrderSuccess({ current_order: order })),
                catchError((e) => {
                    console.error(`Get order failed with error: ${e.message}`);
                    return of(fromActions.getOrderFailure());
                })
            )
        )
    ));

    getOrderFailure$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.getOrderFailure),
        map(() => setMessage({
            message: 'Sorry, we are unable to get your order details at this time! Please contact us if you want to enquire about your order...',
            messageType: 'warn'
        }))
    ));
}