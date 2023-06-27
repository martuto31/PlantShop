import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndoorPlantsComponent } from './indoor-plants/indoor-plants.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'indoor-plants', component: IndoorPlantsComponent},
  {path: 'product', component: ProductDetailsComponent},
  {path: 'Cart', component: CartComponent},
  {path: 'Checkout', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
