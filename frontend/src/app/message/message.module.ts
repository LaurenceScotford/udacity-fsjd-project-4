import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import { MessageComponent } from './messageComponent/message.component';
import * as fromMessage from './message.reducer';

@NgModule({
    declarations: [
        MessageComponent
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature(fromMessage.messageFeatureKey, fromMessage.messageReducer)
    ],
    exports: [
        MessageComponent
    ]
})
export class MessageModule { }