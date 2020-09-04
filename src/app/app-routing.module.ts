import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowProductsComponent } from './UserComponents/show-products/show-products.component';
import { HomeComponent } from './UserComponents/home/home.component';
import { LoginComponent } from './UserComponents/login/login.component';
import { RegisterComponent } from './UserComponents/register/register.component';
import { ShowOneProductComponent } from './UserComponents/show-one-product/show-one-product.component';
import { BuyProductComponent } from './UserComponents/buy-product/buy-product.component';
import { SuccessComponent } from './UserComponents/success/success.component';
import { CartComponent } from './UserComponents/cart/cart.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user',component:HomeComponent,children:[
    {path:'showproducts/:category',component:ShowProductsComponent},
    {path:'showoneproduct/:productname',component:ShowOneProductComponent},
    {path:'buyproduct/:productname',component:BuyProductComponent},
    {path:'success',component:SuccessComponent},
    {path:'cart',component:CartComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
