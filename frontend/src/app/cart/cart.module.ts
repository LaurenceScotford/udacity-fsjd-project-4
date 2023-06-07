import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatIconModule } from '@angular/material/icon';

import { CartComponent } from './cart-component/cart.component';
import { CartProductComponent } from './cart-product/cart-product.component';
import * as fromCart from './cart.reducer'
import { CartEffects } from './cart.effects';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';

@NgModule({
    declarations: [
        CartComponent,
        CartProductComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        MatIconModule,
        StoreModule.forFeature(fromCart.cartFeatureKey, fromCart.cartReducer),
        EffectsModule.forFeature([CartEffects])
    ]
})
export class CartModule {
}