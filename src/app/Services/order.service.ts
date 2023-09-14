import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  private apiOrderUrl = 'https://localhost:7260/api/Order';

  private token = localStorage.getItem('token');
  private headers = new HttpHeaders({
    Authorization: 'Bearer ' + this.token?.toString()
  });

  AddOrder(order: Order){
    return this.http.post(`${this.apiOrderUrl}/AddOrder`, order, {headers: this.headers})
  }
}
