import { ModuleWithProviders, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { ConfirmationComponent } from './confirmation/confirmation.component';
import { OrderService } from './order.service';
import { OrderEffects } from './order.effects';
import * as fromOrder from './order.reducer'

@NgModule({
    declarations: [
        ConfirmationComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        RouterModule,
        StoreModule.forFeature(fromOrder.orderFeatureKey, fromOrder.orderReducer),
        EffectsModule.forFeature([OrderEffects])
    ]
})
export class OrdersModule {
    static forRoot(): ModuleWithProviders<OrdersModule> {
        return {
            ngModule: OrdersModule,
            providers: [
                OrderService
            ]
        }
    }
}