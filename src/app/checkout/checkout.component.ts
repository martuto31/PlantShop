import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor() { }

  cart: Cart = {products: []}
  priceFromCart: number = 0;
  courierPrice: number = 5.40;
  totalPrice: string = '';

  ngOnInit(): void {
    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }

    this.priceFromCart = this.calculateTotalPriceFromCart();
    this.calculateTotalPrice();
  }

  selectedOption: number = 0;

  selectOption(optionIndex: number) {
      this.selectedOption = optionIndex;
  }

  calculateTotalPriceFromCart(){
    var totalCartPrice = 0;
    this.cart.products.forEach(product => {
      totalCartPrice += product.price;
    });
    return totalCartPrice;
  }

  calculateTotalPrice(){
    this.totalPrice = (this.priceFromCart + this.courierPrice).toFixed(2);
  }

  removeFromCart(id: number){
    const index = this.cart.products.findIndex((product) => product.id === id);

    this.cart.products.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart))

    this.priceFromCart = this.calculateTotalPriceFromCart();
    this.calculateTotalPrice();
  }

  getBase64ImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }
}
