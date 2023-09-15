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
    let productIsInCart = this.cart.products.find(x => x. id === this.product.id);

    if(productIsInCart){
      productIsInCart.quantity++;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
    else{
      this.product.quantity = 1;

      this.cart.products.push(this.product);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
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
    return `data:image/jpeg;base64,${base64String}`;
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
