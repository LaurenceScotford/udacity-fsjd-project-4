import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import * as fromActions from './products.actions';
import { ProductListService } from "./product-list.service";
import { clearMessage, setMessage } from '../message/message.actions';


@Injectable()
export class ProductsEffects {
    constructor(
        private actions$: Actions,
        private productsListService: ProductListService
    ) { }

    // Get product list from db
    getProducts$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadProducts),
        exhaustMap(() => this.productsListService.getProducts()
            .pipe(
                map((products) => fromActions.productsLoaded({ products })),
                catchError(() => of(fromActions.loadProductsFailed()))
            )
        )
    ));

    // Clear message banner on successful loading as there may have previously been an error        
    productsLoaded$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.productsLoaded),
        map(() => clearMessage())
    ));

    // Display error message if loading products failed
    loadProductsFailed$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadProductsFailed),
        map(() => setMessage({
            message: 'An error occurred while loading the product list! Please try again later...',
            messageType: 'warn'

        }))
    ));
}