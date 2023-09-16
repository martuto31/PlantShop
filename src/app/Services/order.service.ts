import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateOrder } from '../models/createOrder';
import { GetOrder } from '../models/getOrder';

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

  AddOrder(order: CreateOrder){
    return this.http.post(`${this.apiOrderUrl}/AddOrder`, order, {headers: this.headers})
  }

  GetOrdersByUserId(): Observable<GetOrder[]>{
    return this.http.get<GetOrder[]>(`${this.apiOrderUrl}/GetOrdersByUserId`, {headers: this.headers})
  }
}
