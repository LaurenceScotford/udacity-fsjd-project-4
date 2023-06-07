export const cartLocalStorageName = 'cart';

export interface CartItem {
    product_id: string;
    quantity: number;
}

export interface CartState {
    cartItems: CartItem[];
}