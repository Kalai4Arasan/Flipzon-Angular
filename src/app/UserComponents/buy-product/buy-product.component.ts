import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../products.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { StripeToken, StripeSource, StripeCard } from 'stripe-angular';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit {
  User=null
  product=null
  address=null
  qerror=null
  ferror=null
  quantity=1
  rate=null
  totalAmount=null
  isLoading=true
  token=null
  invalidError
  cardReady

  constructor(private _productService:ProductsService,private _route:ActivatedRoute,private _router:Router) {
    if(!sessionStorage.getItem('User')){
      this._router.navigate(['/login'])
    }
   }

  ngOnInit(): void {
      this.User=jwt_decode(sessionStorage.getItem('User'))
      this._route.paramMap.subscribe(params=>{
          this._productService.getOneProduct(params.get('productname')).subscribe(data=>{
            this.product=data[0]
            this.address=this.User.address
            this.rate=this.product.discount==0?this.product.rate:this.product.rate-this.product.discount
            this.totalAmount=this.rate
            this.isLoading=false
          })
      })
  }
  getRate(){
    return this.product.discount==0?this.product.rate:this.product.rate-this.product.discount
  }
  total(){
    console.log(this.quantity)
    return this.totalAmount=this.quantity*this.rate
  }

  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }
 
  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token)
    if(this.quantity<0 || this.quantity>20 || this.quantity==null || this.address.length==0 || this.totalAmount<this.rate || this.totalAmount<=0){
        this.ferror="Invalid Payement Values...."
    }
    else{
        this.ferror=null
        let Data={
          'uid':this.User.id,
          'pid':this.product.pid,
          'productname':this.product.productname,
          'name':this.User.name,
          'address':this.User.address,
          'quantity':this.quantity,
          'totalRate':this.totalAmount,
          'buyingdate':new Date(),
          'token':token.id,
          'jwtToken':sessionStorage.getItem('User'),
        }
        this._productService.buyProduct(Data).subscribe(data=>{
          if(data.length>0){
            this._router.navigate(['/user/success'],{state:[Data,data]})
          }
        },err=>{
          sessionStorage.removeItem("User")
          this._router.navigate(['/notFound',err.statusText])
        })
    }
  }
 
  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }
 
  onStripeError( error:Error ){
    console.error('Stripe error', error)
  }


}
