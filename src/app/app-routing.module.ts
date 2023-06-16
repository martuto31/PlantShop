import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndoorPlantsComponent } from './indoor-plants/indoor-plants.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'indoor-plants', component: IndoorPlantsComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
