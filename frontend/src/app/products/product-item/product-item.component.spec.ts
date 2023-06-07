import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductItemComponent } from './product-item.component';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let router: Router;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductItemComponent
      ],
      providers: [
        provideMockStore({ initialState })
      ],
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes([])
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create ProductItemComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an Add to Cart Event when addToCart is called', () => {
    spyOn(component.addToCartEvent, 'emit');

    const product_id = 'product_id';
    const quantity = 1;

    component.product.id = product_id;
    component.quantity = quantity.toString();

    component.addToCart();

    expect(component.addToCartEvent.emit).toHaveBeenCalledWith({
      product_id: product_id,
      quantity: quantity
    });
  });

});
