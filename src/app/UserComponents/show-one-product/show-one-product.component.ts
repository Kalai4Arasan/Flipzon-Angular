import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { products } from '../../products';
import { ProductsService } from '../../products.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-show-one-product',
  templateUrl: './show-one-product.component.html',
  styleUrls: ['./show-one-product.component.css']
})
export class ShowOneProductComponent implements OnInit {
  productname:String;
  product=null;
  showImage=null;
  error=null;
  success=null;
  isLoading=true;
  reviews=null;
  userData=null;
  isCartLoading=false;

  constructor(private _route:ActivatedRoute,private _productService:ProductsService,private _router:Router) { 
    if(sessionStorage.getItem("User")){
      this.userData=jwt_decode(sessionStorage.getItem('User'))
    }
  }

  ngOnInit(): void {
      this._route.paramMap.subscribe(params=>{
        
        this.productname=params.get('productname')
        this._productService.getOneProduct(this.productname).subscribe(data=>{
          this.product=data[0]
          this._productService.getReviews(this.product.pid).subscribe(data=>{
            this.reviews=data
          })
          this.showImage=data[0].images[0]
          this.isLoading=false
        })
      })
  }
  setImage(image){
    this.showImage=image
  }
  handleCart(product){
    if(!sessionStorage.getItem('User')){
      this._router.navigate(['/login'])
    }
    else{
        this._productService.addCart(this.userData.id,product.pid).subscribe(result=>{
          console.log(result)
          if(result[0]!="Error"){
            this.success="Product Added In Your Cart"
          }
          else{
            this.error="Already Added In Your Cart"
          }
        })
    }
  }
  handleBuy(productname){
    if(!sessionStorage.getItem('User')){
      return this._router.navigate(['/login'])
    }
    console.log(productname)
    this._router.navigate(['/user/buyproduct',productname])
  }

}
