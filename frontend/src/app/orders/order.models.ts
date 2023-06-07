import { CartItem } from "../cart/cart.models";

export interface Order {
    id?: string | number | null;
    user_id: string;
    recipient_name: string;
    delivery_address: string;
    date_time: number;
    products: CartItem[];
    status: 'active' | 'complete';
}

export interface OrderProduct {
    name: string;
    quantity: number;
}

export interface OrderState {
    current_order: Order | null;
}

