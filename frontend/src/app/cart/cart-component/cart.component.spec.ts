import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { cold } from 'jasmine-marbles';

import { CartComponent } from './cart.component';
import { CartItem } from '../cart.models';


// Component stubs
@Component({ selector: 'mat-icon', template: '' })
class MatIconStubComponent {
}

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let router: Router;
  let store: MockStore;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CartComponent,
        MatIconStubComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an Update Item action when onQuantityChange is called', () => {

    const item: CartItem = {
      product_id: 'product_id',
      quantity: 1
    };

    const expected = cold('a', {
      a: {
        type: '[cart] Update Item',
        cartItem: item
      }
    });

    component.onQuantityChange(item);

    expect(store.scannedActions$).toBeObservable(expected);
  });

  it('should dispatch an Empty Cart action when onEmptyCart is called', () => {

    const showMessage = true;

    const expected = cold('a', {
      a: {
        type: '[cart] Empty Cart',
        showMessage: showMessage
      }
    });

    component.onEmptyCart();

    expect(store.scannedActions$).toBeObservable(expected);
  });

});
