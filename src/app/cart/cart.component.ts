import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService){}

  cart: Cart = { products: []};
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
    return this.productService.getBase64ImageUrl(base64String);
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
      totalPrice += (product.price * product.quantity);
    });
    return totalPrice.toFixed(2);
  }

  addQuantity(id: number){
    const productIndex = this.cart.products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      this.cart.products[productIndex].quantity++;
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.totalPrice = this.calculateTotalPriceFromCart();
    }
  }

  subtractQuantity(id: number){
    const productIndex = this.cart.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      if(this.cart.products[productIndex].quantity > 1){
        this.cart.products[productIndex].quantity--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.totalPrice = this.calculateTotalPriceFromCart();
      }
      else{
        this.removeFromCart(id);
      }
    }
  }

  private clearCart(){
    localStorage.removeItem('cart');
  }
}
