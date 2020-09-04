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
