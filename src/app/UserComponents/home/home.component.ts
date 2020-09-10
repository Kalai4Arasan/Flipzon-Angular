import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Flipzon-Angular';
  userData=null;
  cartCount=0

  
  constructor(private _route:Router,private _productService:ProductsService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('User')){
    this.userData=(jwt_decode(sessionStorage.getItem('User')))
    this._productService.getCartCount(this.userData.id).subscribe(data=>{
      this.cartCount=data[0]
    })
    }
  }
  getCartCount(id){
    this._productService.getCartCount(id).subscribe(data=>{
      this.cartCount=data[0]
    })
  }
  loginPage(){
    this._route.navigate(['/login'],{state:{url:[this._route.url]}})
  }

  logout(){
    sessionStorage.removeItem("User")
    this.userData=null
    this._route.navigate(['/home'])
  }
}
