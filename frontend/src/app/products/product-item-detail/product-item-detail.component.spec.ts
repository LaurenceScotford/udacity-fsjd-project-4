import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ProductItemDetailComponent } from './product-item-detail.component';
import { cold } from 'jasmine-marbles';

describe('ProductItemDetailComponent', () => {
  let component: ProductItemDetailComponent;
  let fixture: ComponentFixture<ProductItemDetailComponent>;
  let route: ActivatedRoute;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemDetailComponent],
      imports: [HttpClientTestingModule],
      providers:
        [
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: { paramMap: convertToParamMap({ id: '12abcde345678fg012hijk' }) }
            }
          },
          provideMockStore({ initialState })
        ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemDetailComponent);
    route = TestBed.inject(ActivatedRoute);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ProductItemDetailComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a Add Product To Cart action when addToCart is called', () => {
    const product_id = 'product_id';
    const quantity = 1;

    component.product = {
      id: product_id,
      name: 'name',
      price: .01,
      url: 'url',
      description: 'description'
    };
    component.quantity = quantity.toString();

    const expected = cold('a', {
      a: {
        type: '[cart] Add Product To Cart',
        cartItem: {
          product_id: product_id,
          quantity: quantity
        }
      }
    });

    component.addToCart();

    expect(store.scannedActions$).toBeObservable(expected);
  });
});
