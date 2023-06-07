import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { ProductListComponent } from './product-list.component';
import { cold } from 'jasmine-marbles';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create ProductListComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an Add Product To Cart action when addToCart is called', () => {
    const cartItem = {
      product_id: 'product_id',
      quantity: 1
    };

    const expected = cold('a', {
      a: {
        type: '[cart] Add Product To Cart',
        cartItem: cartItem
      }
    });

    component.addToCart(cartItem);

    expect(store.scannedActions$).toBeObservable(expected);
  });
});
