import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { CartProductComponent } from './cart-product.component';

describe('CartProductComponent', () => {
  let component: CartProductComponent;
  let fixture: ComponentFixture<CartProductComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartProductComponent],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create CartProductComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when onQuantityChange is called', () => {
    spyOn(component.quantityChangeEvent, 'emit');

    const item = {
      product_id: 'product_id',
      quantity: 1
    }

    const newQuantity = 2;

    component.item = item;
    component.newQuantity = newQuantity;

    component.onQuantityChange();

    expect(component.quantityChangeEvent.emit).toHaveBeenCalledWith({
      product_id: item.product_id,
      quantity: newQuantity
    });
  });
});
