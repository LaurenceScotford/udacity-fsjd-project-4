import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface Product {
    id: string;
    name: string;
    price: number;
    url: string;
    description: string;
}

export interface ProductsState extends EntityState<Product> {
    selectedProductId: string | null;
    status: 'pending' | 'loading' | 'error' | 'success';
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();
