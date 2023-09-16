import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndoorPlantsComponent } from './indoor-plants/indoor-plants.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AddProductComponent } from './add-product/add-product.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'Indoor-plants', component: IndoorPlantsComponent},
  {path: 'Product/:id', component: ProductDetailsComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'Checkout', component: CheckoutComponent},
  {path: 'AddProduct', component: AddProductComponent},
  {path: 'Login', component: LoginComponent},
  {path: 'Profile', component: ProfileComponent, children:[
    {path: 'MyOrders', component: MyOrdersComponent},
  ]},
  {path: 'Favourites', component: FavouriteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
