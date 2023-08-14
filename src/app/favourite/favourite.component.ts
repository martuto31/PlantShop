import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../Services/product.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAllFavouriteProducts();
    console.log(this.products);
  }

  getAllFavouriteProducts(){
    this.productService.getAllUserFavouriteProducts().subscribe((products: Product[]) => {
      products.forEach((product: Product) => {
        this.products.push(product);
      });
    })
  }
}
