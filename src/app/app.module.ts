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


@NgModule({
  declarations: [
    AppComponent,
    ShowProductsComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
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
