import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../Services/product.service';
import { Router } from '@angular/router';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  products: Product[] = [];
  cart: Cart = { products: [] };

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getAllFavouriteProducts();
    
    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }

  getAllFavouriteProducts(){
    this.productService.getAllUserFavouriteProducts().subscribe((products: Product[]) => {
      products.forEach((product: Product) => {
        this.products.push(product);
      });
    })
  }

  getBase64ImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  addToCart(product: Product): void {
    this.cart.products.push(product);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  redirectToDetails(id: number){
    this.router.navigate(['/Product/' + id])
  }
}
