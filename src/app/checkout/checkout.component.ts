import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart';
import { OrderService } from '../Services/order.service';
import { CreateOrder } from '../models/createOrder';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private orderService: OrderService, private productService: ProductService) { }

  cart: Cart = {products: []};
  order: CreateOrder = {Name: '', Surname: '', Address: '', City: '', Region: '', PostalCode: '', PhoneNumber: '', OrderTotal: 0, OrderWeight: 0, ProductsId: []};
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
      totalCartPrice += product.price * product.quantity;
    });
    return totalCartPrice;
  }

  calculateTotalPrice(){
    this.totalPrice = (this.priceFromCart + this.courierPrice).toFixed(2);
  }

  calculateOrderPrice(){
    this.order.OrderTotal = this.priceFromCart + this.courierPrice;
  }

  calculateOrderWeight(){
    let orderWeight = 0;

    this.cart.products.forEach(product => {
      if(product.weight !== 0 && product.weight !== undefined){
        console.log(product.weight);
        console.log(product.quantity);
        orderWeight += product.weight * product.quantity;
      }
    });

    this.order.OrderWeight = orderWeight;
  }

  addProductsIdToOrder(){
    this.cart.products.forEach(product => {
      this.order.ProductsId.push(product.id);
    });
  }
 
  removeFromCart(id: number){
    const index = this.cart.products.findIndex((product) => product.id === id);

    this.cart.products.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart))

    this.priceFromCart = this.calculateTotalPriceFromCart();
    this.calculateTotalPrice();
  }

  addQuantity(id: number){
    const productIndex = this.cart.products.findIndex((product) => product.id === id);

    if (productIndex !== -1) {
      this.cart.products[productIndex].quantity++;
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.priceFromCart = this.calculateTotalPriceFromCart();
      this.calculateTotalPrice();
    }
  }

  subtractQuantity(id: number){
    const productIndex = this.cart.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      if(this.cart.products[productIndex].quantity > 1){
        this.cart.products[productIndex].quantity--;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.priceFromCart = this.calculateTotalPriceFromCart();
        this.calculateTotalPrice();
      }
      else{
        this.removeFromCart(id);
      }
    }
  }

  getBase64ImageUrl(base64String: string): string {
    return this.productService.getBase64ImageUrl(base64String);
  }

  addOrder(){
    this.calculateOrderPrice();
    this.calculateOrderWeight();
    this.addProductsIdToOrder();

    this.orderService.AddOrder(this.order).subscribe(() =>{
      console.log(this.order);
    }, err => {
      console.log(err);
    })
  }
}
