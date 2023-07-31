import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../Services/product.service';
import { ProductTypeConstants } from '../models/productTypeConstants';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private productService: ProductService) { }

  mostSoldProducts: Product[] = [];
  newestProducts: Product[] = [];
  cart: Cart = { products: [] };
  ProductType: string = ProductTypeConstants.IndoorPlants; // to make it any so that i gets the newest and most sold from both categories Indoor and Outdoor
  skipCount: number = 0;

  ngOnInit(): void {
    this.GetNewestProducts();
    this.GetMostSoldProducts();
    
    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }

  public GetNewestProducts(){
    this.productService.getNewestProducts(this.ProductType, this.skipCount).subscribe((products: Product[]) =>{
      products.forEach((product: Product) => {
        this.newestProducts.push(product);
      });
    })
  }

  public GetMostSoldProducts(){
    this.productService.getMostSoldProducts(this.ProductType, this.skipCount).subscribe((products: Product[]) =>{
      products.forEach((product: Product) => {
        this.mostSoldProducts.push(product);
      });
    })
  }

  addToCart(product: Product): void {
    this.cart.products.push(product);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getBase64ImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  redirectToDetails(id: number){
    this.router.navigate(['/Product/' + id])
  }
}
