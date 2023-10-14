import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';
import { UserService } from '../Services/user.service';
import { CartService } from '../Services/cart.service';
import { FavoriteProductService } from '../Services/favorite-product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  cart: Cart = { products: [] };
  private isAuthenticated: boolean = false;
  private isAuthenticatedSubscription: Subscription | undefined;
  private getAllFavoriteProductsSubscription: Subscription | undefined;
  private deleteFromFavouritesSubscription: Subscription | undefined;

  constructor(
    private productService: ProductService, 
    private router: Router, 
    private userService: UserService,
    private cartService: CartService, 
    private favoriteProductService: FavoriteProductService
    ) { }

  ngOnInit(): void {
    this.isAuthenticatedSubscription = this.userService.isAuthenticated$.subscribe((isAuthenticated) => {
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
      this.getAllFavoriteProductsSubscription = this.productService.getAllUserFavouriteProducts().subscribe((products: Product[]) => {
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
    this.cartService.addToCart(product);
  }

  deleteFromFavourites(productId: number){
    if(this.isAuthenticated){
      this.deleteFromFavouritesSubscription = this.favoriteProductService.deleteFromFavourites(productId).subscribe(
        response => {
          this.products = this.products.filter(product => product.id !== productId);

          this.favoriteProductService.setFavoriteCount(this.products.length);
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

      this.favoriteProductService.setFavoriteCount(this.products.length);
    }
  }

  redirectToDetails(id: number){
    this.router.navigate(['/Product/' + id])
  }

  ngOnDestroy(): void {
    if (this.isAuthenticatedSubscription) {
      this.isAuthenticatedSubscription.unsubscribe();
    }

    if (this.getAllFavoriteProductsSubscription) {
      this.getAllFavoriteProductsSubscription.unsubscribe();
    }

    if (this.deleteFromFavouritesSubscription) {
      this.deleteFromFavouritesSubscription.unsubscribe();
    }
  }
}
