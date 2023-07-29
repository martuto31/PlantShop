import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router){}

  cart: Cart = { products: []}
  totalPrice: string = '';
  isOrderPlaced: boolean = false;

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    
    if(cart != null){
      this.cart = cart ? JSON.parse(cart) : [];
    }

    this.totalPrice = this.calculateTotalPriceFromCart();
  }

  getBase64ImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  removeFromCart(id: number){
    const index = this.cart.products.findIndex((product) => product.id === id);

    this.cart.products.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart))

    this.totalPrice = this.calculateTotalPriceFromCart();
  }

  calculateTotalPriceFromCart(){
    var totalPrice = 0;
    this.cart.products.forEach(product => {
      totalPrice += product.price;
    });
    return totalPrice.toFixed(2);
  }

  private clearCart(){
    localStorage.removeItem('cart');
  }
}
