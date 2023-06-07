import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OrderService } from './order.service';
import { environment } from 'src/environments/environment';
import { Order } from './order.models';

interface orderJson {
  order: Order;
}

describe('OrderService', () => {
  let service: OrderService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should make an Http Get request to the orders endpoint when getOrder is called', () => {
    const id = 'id';

    const dummyResponse = {
      current_order: {
        id: id,
        user_id: 'user_id',
        recipient_name: 'recipient_name',
        delivery_address: 'delivery_address',
        date_time: 1,
        products: [
          {
            product_id: 'product_id',
            quantity: 1
          }
        ],
        status: 'active'
      }
    };

    service.getOrder(id)
      .subscribe({
        next: () => { return }
      });

    const requestWrapper = httpTestingController.expectOne({ url: `${environment.apiURL}orders/${id}` });
    requestWrapper.flush(dummyResponse);

    expect(requestWrapper.request.method).toBe('GET');
  });

  it('Should make an Http Post request to the orders endpoint when createOrder is called', () => {
    const id = 'id';

    const dummyOrder: Order = {
      user_id: 'user_id',
      recipient_name: 'recipient_name',
      delivery_address: 'delivery_address',
      date_time: 1,
      products: [
        {
          product_id: 'product_id',
          quantity: 1
        }
      ],
      status: 'active'
    };

    service.createOrder(dummyOrder)
      .subscribe({
        next: () => { return }
      });

    const requestWrapper = httpTestingController.expectOne({ url: `${environment.apiURL}orders` });
    dummyOrder.id = 'id';
    requestWrapper.flush(dummyOrder);

    expect(requestWrapper.request.method).toBe('POST');
    expect(requestWrapper.request.body).toEqual(dummyOrder);
  });
});
