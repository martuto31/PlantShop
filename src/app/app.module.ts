import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { IndoorPlantsComponent } from './indoor-plants/indoor-plants.component';
import { FormsModule, NgSelectOption, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import {register} from 'swiper/element/bundle';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddProductComponent } from './add-product/add-product.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

register();
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    IndoorPlantsComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
    FooterComponent,
    AddProductComponent,
    LoginComponent,
    ProfileComponent,
    FavouriteComponent,
    MyOrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
