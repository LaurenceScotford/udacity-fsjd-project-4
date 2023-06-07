import { AuthState } from './auth/auth.models';
import { CartState } from './cart/cart.models';
import { OrdersState } from './orders/order.models';
import { ProductsState } from './products/products.models';

export interface AppState {
    auth: AuthState;
    products: ProductsState;
    cart: CartState;
    orders: OrdersState;
}