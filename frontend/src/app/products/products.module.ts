import { ModuleWithProviders, NgModule } from '@angular/core';

import { ProductItemDetailComponent } from "./product-item-detail/product-item-detail.component";
import { ProductItemComponent } from "./product-item/product-item.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductListService } from './product-list.service';
import { MatIconModule } from '@angular/material/icon';
import { productsReducer } from './products.reducer';
import * as fromProducts from './products.reducer';
import { ProductsEffects } from './products.effects';


@NgModule({
    declarations: [
        ProductItemComponent,
        ProductItemDetailComponent,
        ProductListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatIconModule,
        RouterModule,
        StoreModule.forFeature(fromProducts.productsFeatureKey, fromProducts.productsReducer),
        EffectsModule.forFeature([ProductsEffects])
    ]
})
export class ProductsModule {
    static forRoot(): ModuleWithProviders<ProductsModule> {
        return {
            ngModule: ProductsModule,
            providers: [
                ProductListService
            ]
        }
    }
}