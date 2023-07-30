import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  productId: number = this.route.snapshot.params['id'];
  product: Product = {id: 0, name: '', commonName: '', botanicalName: '', price: 0, sales: 0, description: '', additionalDescription: '', lightIntensity: 0, growDifficulty: 0, productType: 0, 
                      PetCompatibility: false, AirPurify: false, picturesData: [], productSizes: [], productColors: []};
  currentPictureIndex: number = 0;
  cart: Cart = { products: [] };

  ngOnInit(): void {
    this.getProductById(this.productId);

    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }

  ngAfterViewInit() {
    new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 3,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
  }

  addToCart(): void {
    this.cart.products.push(this.product);

    localStorage.setItem('cart', JSON.stringify(this.cart));
  }


  getProductById(id: number): any{
    this.productService.getProductById(id).subscribe((product: Product) =>{
      this.product = product;
    });
  }

  getBase64ImageUrl(base64String: string): string {
    return `data:image/jpeg;base64,${base64String}`;
  }

  selectPicture(index: number){
    this.currentPictureIndex = index;
  }
}
