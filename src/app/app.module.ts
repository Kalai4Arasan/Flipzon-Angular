import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShowProductsComponent } from './UserComponents/show-products/show-products.component';
import { HomeComponent } from './UserComponents/home/home.component';

import { from } from 'rxjs';
import { LoginComponent } from './UserComponents/login/login.component';
import { RegisterComponent } from './UserComponents/register/register.component';
import { ShowOneProductComponent } from './UserComponents/show-one-product/show-one-product.component';
import { BuyProductComponent } from './UserComponents/buy-product/buy-product.component';
import { SuccessComponent } from './UserComponents/success/success.component';
import { CartComponent } from './UserComponents/cart/cart.component';
import { OrdersComponent } from './UserComponents/orders/orders.component';
import { OrdersCategoryComponent } from './UserComponents/orders-category/orders-category.component';
import { AddBrandComponent } from './AdminComponents/add-brand/add-brand.component';
import { AddCategoryComponent } from './AdminComponents/add-category/add-category.component';
import { AdminHomeComponent } from './AdminComponents/admin-home/admin-home.component';
import { AdminLoginComponent } from './AdminComponents/admin-login/admin-login.component';
import { AdminProductsComponent } from './AdminComponents/admin-products/admin-products.component';
import { AdminOrdersComponent } from './AdminComponents/admin-orders/admin-orders.component';
import { AdminOrdersCategoryComponent } from './AdminComponents/admin-orders-category/admin-orders-category.component';
import { AddProductsComponent } from './AdminComponents/add-products/add-products.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowProductsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ShowOneProductComponent,
    BuyProductComponent,
    SuccessComponent,
    CartComponent,
    OrdersComponent,
    OrdersCategoryComponent,
    AddBrandComponent,
    AddCategoryComponent,
    AdminHomeComponent,
    AdminLoginComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminOrdersCategoryComponent,
    AddProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
