import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import { UserService } from '../../user.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Flipzon-Angular';
  userData=null;
  cartCount=0
  readonly VAPID_PUBLIC_KEY="BFJHsYBXZ7gv8XNFVu1akovTu1RPT7u4mtA9M_4kpOo7gi9qKvyLH5ZNmAWiHGkIqPu4xfaq8MPOWDwltinxzT8"
  
  constructor(private _route:Router,private _productService:ProductsService,private _user:UserService,private _swPush:SwPush) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('User')){
    this.userData=(jwt_decode(sessionStorage.getItem('User')))
    this._productService.getCartCount(this.userData.id).subscribe(data=>{
      this.cartCount=data[0]
    })
    }
    if(this._swPush.isEnabled){
    this._swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this._productService.addPushSubscriber(sub).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
    }

  }
  getCartCount(id){
    this._productService.getCartCount(id).subscribe(data=>{
      this.cartCount=data[0]
    })
  }
  loginPage(){
    console.log(this._route.url)
    this._route.navigate(['/login'],{state:{url:[this._route.url]}})
  }

  logout(){
    this._user.userLogout(sessionStorage.getItem('User')).subscribe(data=>{
      sessionStorage.removeItem("User")
      this.userData=null
      this._route.navigate(['/home'])
    },err=>{
      sessionStorage.removeItem("User")
      this.userData=null
      this._route.navigate(['/notFound',err.statusText])
    })
  }
}
