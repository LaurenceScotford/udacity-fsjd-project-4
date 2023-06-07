import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';


import * as orderActions from '../order.actions';
import { selectOrderDateTime, selectOrderProducts, selectOrderTotal } from '../order.selector';
import { OrderProduct } from '../order.models';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  orderProducts: OrderProduct[] | null = null;
  orderProductsSub: Subscription | null | undefined;
  orderTotal: string = '';
  orderTotalSub: Subscription | null | undefined;
  orderDateTime: number | undefined;
  orderDateTimeSub: Subscription | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.getOrder();
    this.orderProductsSub = this.store.select(selectOrderProducts)
      .subscribe(orderProducts => this.orderProducts = orderProducts);
    this.orderTotalSub = this.store.select(selectOrderTotal)
      .subscribe(total => this.orderTotal = total.toFixed(2));
    this.orderDateTimeSub = this.store.select(selectOrderDateTime)
      .subscribe(datetime => this.orderDateTime = datetime);
  }

  ngOnDestroy(): void {
    this.orderProductsSub?.unsubscribe();
    this.orderProductsSub = null;
    this.orderTotalSub?.unsubscribe();
    this.orderTotalSub = null;
  }

  getOrder(): void {
    const id: string | null = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(orderActions.getOrder({ id: id as string }));
  }
}
