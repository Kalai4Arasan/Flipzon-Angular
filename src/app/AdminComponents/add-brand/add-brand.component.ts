import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  brands=null;
  isLoading=true;
  categories=null;
  brand="";
  totalBrands=[];
  category=null;
  categoryList=[];
  ferror=null;
  adminData=null;
  constructor(private _admin:AdminService,private _router:Router) { }

  ngOnInit(): void {
    let Data={}
    this.adminData=this._admin.adminData()
    this._admin.Brands(this.adminData.admin_id).subscribe(data=>{
      for(let item of data){
        this.totalBrands.push(item.brand)
        if(item.brand in Data){
            Data[item.brand].push(item.category)
        }
        else{
            Data[item.brand]=[item.category]
        }
      }
      this.brands=Data
      this._admin.Categories(this.adminData.admin_id).subscribe(data=>{
        this.categories=data
      })
      this.isLoading=false
    },err=>{
      sessionStorage.removeItem("Admin")
      this._router.navigate(['/notFound',err.statusText])
    })
  }
  handleCategory(){
    this.ferror=null
    if(this.categoryList.indexOf(this.category)==-1 &&this.category!=null&& this.category.length>0){
      this.categoryList.push(this.category)
    }
    else{
      this.ferror="Invalid Input"
    }
  }
  cancelCategory(item){
    this.categoryList.splice(item,1)
  }
  handleSubmit(data){
    this.ferror=null
    if(data.brand.length>0 && this.categoryList.length>0){
        for(let item of this.totalBrands){
          if(data.brand.toLowerCase()==item.toLowerCase()){
            return this.ferror="this brand is already available "
          }
        }
        if(this.ferror==null || this.ferror.length==0){
          this._admin.addBrand({'CategoryList':this.categoryList,'brand':this.brand,'jwtToken':sessionStorage.getItem("Admin")},this.adminData.admin_id).subscribe(data=>{
            let Data={}
            this.totalBrands.push(this.brand)
            this._admin.Brands(this.adminData.admin_id).subscribe(data=>{
              for(let item of data){
                if(item.brand in Data){
                    Data[item.brand].push(item.category)
                }
                else{
                    Data[item.brand]=[item.category]
                }
              }
              this.brands=Data
              this._admin.Categories(this.adminData.admin_id).subscribe(data=>{
                this.categories=data
              })
              this.isLoading=false
            },err=>{
              sessionStorage.removeItem("Admin")
              this._router.navigate(['/notFound',err.statusText])
            })
          },err=>{
            sessionStorage.removeItem("Admin")
            this._router.navigate(['/notFound',err.statusText])
          })
        }
        
    }
    else{
      this.ferror="invalid input"
    }
  }

}
