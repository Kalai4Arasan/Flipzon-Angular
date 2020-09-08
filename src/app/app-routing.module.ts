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
import { OrdersComponent } from './UserComponents/orders/orders.component';
import { OrdersCategoryComponent } from './UserComponents/orders-category/orders-category.component';
import { AdminHomeComponent } from './AdminComponents/admin-home/admin-home.component';
import { AddBrandComponent } from './AdminComponents/add-brand/add-brand.component';
import { AddCategoryComponent } from './AdminComponents/add-category/add-category.component';
import { AdminLoginComponent } from './AdminComponents/admin-login/admin-login.component';
import { AdminProductsComponent } from './AdminComponents/admin-products/admin-products.component';
import { AdminOrdersComponent } from './AdminComponents/admin-orders/admin-orders.component';
import { AdminOrdersCategoryComponent } from './AdminComponents/admin-orders-category/admin-orders-category.component';
import { AddProductsComponent } from './AdminComponents/add-products/add-products.component';


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
    {path:'cart',component:CartComponent},
    {path:'orders',component:OrdersComponent,
    children:[
      {path:'',pathMatch:'full',redirectTo:'category/pending'},
      {path:'category/:type',component:OrdersCategoryComponent}
    ]
    }
  ]},
  {path:'admin',component:AdminHomeComponent},
  {path:'adminlogin',component:AdminLoginComponent},
  {path:'admin',component:AdminHomeComponent,
  children:[
    {path:'addbrands',component:AddBrandComponent},
    {path:'addcategory',component:AddCategoryComponent},
    {path:'products',component:AdminProductsComponent},
    {path:'addProducts',component:AddProductsComponent},
    {path:'orders',component:AdminOrdersComponent,
    children:[
      { path:'',pathMatch:'full',redirectTo:'category/1'},
      {path:'category/:type',component:AdminOrdersCategoryComponent}
    ]
    }
  ]
  }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
