import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../products.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-orders-category',
  templateUrl: './orders-category.component.html',
  styleUrls: ['./orders-category.component.css']
})
export class OrdersCategoryComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _productService:ProductsService,private _router:Router) { }
  type:string;
  typeValue:Number;
  success=null;
  fail=null;
  Data=null;
  userData=null;
  isLoading=true;
  hasReview={};
  review="";
  reviewsId=[];
  rating=1;
  finalError=false
  ngOnInit(): void {
        this._route.paramMap.subscribe(params=>{
          this.type=params.get('type')
          if(this.type=='pending'){
            this.typeValue=1
          }
          else if(this.type=='shipped'){
            this.typeValue=3
          }
          else if(this.type=='canceled'){
            this.typeValue=2
          }
          
          if(sessionStorage.getItem('User')){
            this.userData=jwt_decode(sessionStorage.getItem('User'))
          }
          let dataCategory={
            'uid':this.userData.id,
            'status':this.typeValue,
            'jwtToken':sessionStorage.getItem("User")
          }
          // console.log(dataCategory)
          this._productService.getOrderedCategory(dataCategory).subscribe(data=>{
              this.Data=data
              // console.log(this.Data)
              this._productService.getReviewId(this.userData.id).subscribe(data=>{
                for(let item of data){
                  this.reviewsId.push(item.buyid)
                }
              },err=>{
                sessionStorage.removeItem("User")
                this._router.navigate(['/notFound',err.statusText])
              })
              for(let item of this.Data){
                this.hasReview[item.buyid]=false
              }
              this.isLoading=false
          },err=>{
            sessionStorage.removeItem("User")
            this._router.navigate(['/notFound',err.statusText])
          })
        })
  }
  handleCancel(item){
    this._productService.cancelProduct(item.buyid).subscribe(res=>{
      if(res.length>0){
        this.getOrderedCategory()
      }
    },err=>{
      sessionStorage.removeItem("User")
      this._router.navigate(['/notFound',err.statusText])
    })
  }

  getOrderedCategory(){
    let dataCategory={
      'uid':this.userData.id,
      'status':this.typeValue,
      'jwtToken':sessionStorage.getItem("User")
    };
      this._productService.getOrderedCategory(dataCategory).subscribe(data=>{
          this.Data=data
      },err=>{
        sessionStorage.removeItem("User")
        this._router.navigate(['/notFound',err.statusText])
      });
    }
  setReview(id){
    this.hasReview[id]=true
  }
  removeReview(id){
    this.hasReview[id]=false
  }
  handleSubmit(data){
    if(this.review.length==0 || (this.rating>5 || this.rating<=0)){
      return this.finalError=true
    }
    return this._productService.addReview(data).subscribe(result=>{
      let dataCategory={
        'uid':this.userData.id,
        'status':this.typeValue,
        'jwtToken':sessionStorage.getItem('User')
      }
      this._productService.getOrderedCategory(dataCategory).subscribe(data=>{
          this.Data=data
          console.log(this.Data)
          this._productService.getReviewId(this.userData.id).subscribe(data=>{
            for(let item of data){
              this.reviewsId.push(item.buyid)
            }
          },err=>{
            sessionStorage.removeItem("User")
            this._router.navigate(['/notFound',err.statusText])
          })
          for(let item of this.Data){
            this.hasReview[item.buyid]=false
          }
          this.isLoading=false
      },err=>{
        sessionStorage.removeItem("User")
        this._router.navigate(['/notFound',err.statusText])
      })
    },err=>{
      sessionStorage.removeItem("User")
      this._router.navigate(['/notFound',err.statusText])
    })
  }
}
