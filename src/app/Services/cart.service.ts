import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cart: Cart = { products: [] };

  private isAddedToCartSubject = new BehaviorSubject<boolean>(false);
  isAddedToCart$ = this.isAddedToCartSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(product: Product): void {
    this.getProductsFromCart();

    let productIsInCart = this.cart.products.find(x => x. id === product.id);

    if(productIsInCart){
      productIsInCart.quantity++;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    else{
      product.quantity = 1;

      this.cart.products.push(product);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    this.cartCountSubject.next(this.cart.products.length);

    this.setAddedToCart();
  }
  
  setAddedToCart(){
    this.isAddedToCartSubject.next(true);

    setTimeout(() => {
      this.setNotAddedToCart();
    }, 5000);
  }

  setNotAddedToCart(){
    this.isAddedToCartSubject.next(false);
  }

  getProductsFromCart(){
    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }
}
