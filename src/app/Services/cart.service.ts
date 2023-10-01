import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  private isAddedToCartSubject = new BehaviorSubject<boolean>(false);
  isAddedToCart$ = this.isAddedToCartSubject.asObservable();
  
  setAddedToCart(){
    this.isAddedToCartSubject.next(true);
  }

  setNotAddedToCart(){
    this.isAddedToCartSubject.next(false);
  }
}
