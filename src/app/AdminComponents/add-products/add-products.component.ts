import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent implements OnInit {
  brand=null;
  category=null;
  brands=new Set();
  categories=null;
  productname=null;
  description=null;
  rating=null;
  rate=null;
  images=null;
  filteredCategories=null;
  adminData=null;
  brandsCategory={}
  constructor(private _admin:AdminService,private _router:Router) { 
    this.adminData=this._admin.adminData()
    this._admin.Brands(this.adminData.admin_id).subscribe(data=>{
      for(let item of data){
        this.brands.add(item.brand)
        if(Object.keys(this.brandsCategory).indexOf(item.brand)==-1){
          this.brandsCategory[item.brand]=item.categories
        }
        else{
          this.brandsCategory[item.brand].push(item.categories)
        }
      }
      this._admin.Categories(this.adminData.admin_id).subscribe(data=>{
        this.categories=[]
        for(let item of data){
          //console.log(item)
          this.categories.push(item.category)
        }
      })
      this.setCategory(this.brand)
    })
    
  }
  

  ngOnInit(): void {
    if(jwt_decode(sessionStorage.getItem("Admin")).admin_name==null || jwt_decode(sessionStorage.getItem("Admin")).admin_name.length==0 ){
      sessionStorage.removeItem("Admin")
      this._router.navigate(['/notFound','UnAuthorized'])
    }
  }
  setCategory(brand){
    if(brand==null || brand.length==0){
      this.filteredCategories=this.categories
    }
    else{
      this.filteredCategories=this.brandsCategory[brand]
    }
    //console.log(this.filteredCategories)
  }
  storeImages($event){
    this.images=$event.target.files
  }
  handleSubmit(Product){
    const formData = new FormData();
        for (const name of Object.keys(Product)) {
            if (name === "imagesGroup") {
                for (let i = 0; i < Product.imagesGroup.length; i++) {
                    //console.log(Product.imagesGroup[i])
                    formData.append(name, Product.imagesGroup[i]);
                }
            }
            console.log(name,Product[name])
            formData.append(name, Product[name]);
        }
    formData.append('jwtToken',sessionStorage.getItem("Admin"))
    formData.append('aid',this.adminData.admin_id)
    this._admin.addProduct(formData).subscribe(data=>{
      return this._router.navigate(['/admin/products'])
    })
  }

}
