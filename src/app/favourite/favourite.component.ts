import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  products: Product[] = [];
  cart: Cart = { products: [] };
  private isAuthenticated: boolean = false;

  constructor(private productService: ProductService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
    });

    this.getAllFavouriteProducts()
    
    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }

  getAllFavouriteProducts(){
    if(this.isAuthenticated){
      this.productService.getAllUserFavouriteProducts().subscribe((products: Product[]) => {
        products.forEach((product: Product) => {
          this.products.push(product);
        });
      })
    }
    else{
      const productsJSON = localStorage.getItem('favouriteProducts');
      if(productsJSON){
        this.products = JSON.parse(productsJSON);
      }
      else{
        this.products = [];
      }
    }
  }

  getBase64ImageUrl(base64String: string): string {
    return this.productService.getBase64ImageUrl(base64String);
  }

  addToCart(product: Product): void {
    this.cart.products.push(product);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  deleteFromFavourites(productId: number){
    if(this.isAuthenticated){
      this.productService.deleteFromFavourites(productId).subscribe(
        response => {
          this.products = this.products.filter(product => product.id !== productId);
        },
        error => {
          console.log(error);
        }
      );
    }
    else{
      const favoriteProductsJson = localStorage.getItem('favouriteProducts');
      let favoriteProducts: Product[] = favoriteProductsJson ? JSON.parse(favoriteProductsJson) : [];
      
      this.products = this.products.filter(product => product.id !== productId);

      favoriteProducts = favoriteProducts.filter(product => product.id !== productId);
      localStorage.setItem('favouriteProducts', JSON.stringify(favoriteProducts));
    }
  }

  redirectToDetails(id: number){
    this.router.navigate(['/Product/' + id])
  }
}
