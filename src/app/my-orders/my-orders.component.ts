import { Component, OnDestroy, OnInit } from '@angular/core';
import { GetOrder } from '../models/getOrder';
import { OrderService } from '../Services/order.service';
import { DatePipe } from '@angular/common';
import { ProductService } from '../Services/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  private getOrdersByUserIdSubscription: Subscription | undefined;

  constructor(private orderService: OrderService, private productService: ProductService) { }

  ngOnInit(): void {
    this.getOrdersByUserId();
  }

  orders: GetOrder[] = [];

  getOrdersByUserId(){
    this.getOrdersByUserIdSubscription = this.orderService.GetOrdersByUserId().subscribe((orders: GetOrder[]) =>{
      orders.forEach(order => {
        this.orders.push(order);
      });
    }, err =>{
      console.log(err);
    })
  }

  getBase64ImageUrl(base64String: string): string {
    return this.productService.getBase64ImageUrl(base64String);
  }

  ngOnDestroy(): void {
    if (this.getOrdersByUserIdSubscription) {
      this.getOrdersByUserIdSubscription.unsubscribe();
    }
  }
}
