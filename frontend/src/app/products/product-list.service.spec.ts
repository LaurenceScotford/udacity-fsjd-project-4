import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductListService } from './product-list.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

describe('ProductListService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController
  let service: ProductListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductListService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a get request to the products endpoint when getProducts is called', () => {
    const dummyResponse = [
      {
        id: 'id',
        name: 'name',
        price: .01,
        url: 'url',
        description: 'description'
      }
    ];

    service.getProducts()
      .subscribe({
        next: () => { return }
      });

    const requestWrapper = httpTestingController.expectOne({ url: `${environment.apiURL}products` });
    requestWrapper.flush(dummyResponse);

    expect(requestWrapper.request.method).toBe('GET');
  });

  it('should send a get request to the products endpoint when getProduct is called', () => {
    const id = 1;

    const dummyResponse =
    {
      id: id,
      name: 'name',
      price: .01,
      url: 'url',
      description: 'description'
    };

    service.getProduct(1)
      .subscribe({
        next: () => { return }
      });

    const requestWrapper = httpTestingController.expectOne({ url: `${environment.apiURL}products/${id}` });
    requestWrapper.flush(dummyResponse);

    expect(requestWrapper.request.method).toBe('GET');
  });
});
