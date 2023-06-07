// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// App imports
import { CartComponent } from './cart/cart-component/cart.component';
import { ConfirmationComponent } from './orders/confirmation/confirmation.component';
import { ProductItemDetailComponent } from './products/product-item-detail/product-item-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/product-list', pathMatch: 'full' },
  { path: 'cart', component: CartComponent },
  { path: 'confirm-order/:id', component: ConfirmationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'product/:id', component: ProductItemDetailComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
