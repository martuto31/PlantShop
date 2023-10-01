import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { ProductService } from '../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { CartService } from '../Services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  productId: number = this.route.snapshot.params['id'];
  product: Product = {id: 0, name: '', commonName: '', botanicalName: '', price: 0, sales: 0, description: '', additionalDescription: '', lightIntensity: 0, growDifficulty: 0, productType: 0, 
                      PetCompatibility: false, AirPurify: false, picturesData: [], productSizes: [], productColors: [], quantity: 1, weight: 0};
  currentPictureIndex: number = 0;
  cart: Cart = { products: [] };

  ngOnInit(): void {
    this.getProductById(this.productId);
    this.GetProductsFromCart();
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

  addToCart(){
    this.cartService.addToCart(this.product);
  }


  getProductById(id: number): any{
    this.productService.getProductById(id).subscribe((product: Product) =>{
      product.quantity = 1;
      this.product = product;
    });
  }

  GetProductsFromCart(){
    const storedCart = localStorage.getItem('cart');
    if(storedCart != null){
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }

  getBase64ImageUrl(base64String: string): string {
    return this.productService.getBase64ImageUrl(base64String);
  }

  selectPicture(index: number){
    this.currentPictureIndex = index;
  }

  addQuantity(){
    this.product.quantity++;
  }

  subtractQuantity(){
    if(this.product.quantity > 1){
      this.product.quantity--;
    }
  }
}
