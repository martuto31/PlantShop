import { Component, OnInit } from '@angular/core';
import { GetOrder } from '../models/getOrder';
import { OrderService } from '../Services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrdersByUserId();
  }

  orders: GetOrder[] = [];

  getOrdersByUserId(){
    this.orderService.GetOrdersByUserId().subscribe((orders: GetOrder[]) =>{
      orders.forEach(order => {
        this.orders.push(order);
      });
    }, err =>{
      console.log(err);
    })
  }

}
