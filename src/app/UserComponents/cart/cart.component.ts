import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private _router:Router,private _productService:ProductsService) { }
  userData=null
  cartData=null
  isLoading=true
  ngOnInit(): void {
    if(!sessionStorage.getItem('User')){
       this._router.navigate(['/login'])
    }
    else{
      this.userData=jwt_decode(sessionStorage.getItem('User'))
      this._productService.getCarts(this.userData.id).subscribe(data=>{
          this.cartData=data
          this.isLoading=false
      },err=>console.log(err))
    }
  }
  handleCart(item){
    alert(item.productname+" is removed from your cart...")
    this.handleDelete(item.cart_id)
    this._router.navigate(['/user/buyproduct',item.productname])
  }
  handleDelete(cid){
    this._productService.deleteCart(cid,this.userData.id).subscribe(data=>{
      this.cartData=data
    })
  }

}
