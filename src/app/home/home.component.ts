import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../Services/product.service';
import { ProductTypeConstants } from '../models/productTypeConstants';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { CartService } from '../Services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private productService: ProductService, private cartService: CartService) { }

  mostSoldProducts: Product[] = [];
  newestProducts: Product[] = [];
  cart: Cart = { products: [] };
  ProductType: string = ProductTypeConstants.IndoorPlants; // to make it any so that i gets the newest and most sold from both categories Indoor and Outdoor
  skipCount: number = 0;

  private getNewestProductsSubscription: Subscription | undefined;
  private getMostSoldProductsSubscription: Subscription | undefined;

  ngOnInit(): void {
    this.GetNewestProducts();
    this.GetMostSoldProducts();
    this.GetProductsFromCart();
  }

  public GetNewestProducts(){
    this.getNewestProductsSubscription = this.productService.getNewestProducts(this.ProductType, this.skipCount).subscribe((products: Product[]) =>{
      products.forEach((product: Product) => {
        product.quantity = 1;
        this.newestProducts.push(product);
      });
    })
  }

  public GetMostSoldProducts(){
    this.getMostSoldProductsSubscription = this.productService.getMostSoldProducts(this.ProductType, this.skipCount).subscribe((products: Product[]) =>{
      products.forEach((product: Product) => {
        product.quantity = 1;
        this.mostSoldProducts.push(product);
      });
    })
  }

  GetProductsFromCart(){
    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  getBase64ImageUrl(base64String: string): string {
    return this.productService.getBase64ImageUrl(base64String);
  }

  redirectToDetails(id: number){
    this.router.navigate(['/Product/' + id])
  }

  ngOnDestroy(): void {
    if (this.getNewestProductsSubscription) {
      this.getNewestProductsSubscription.unsubscribe();
    }

    if (this.getMostSoldProductsSubscription) {
      this.getMostSoldProductsSubscription.unsubscribe();
    }
  }
}
