import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private _admin:AdminService,private _router:Router) { }
  category="";
  categories=[];
  ferror=null;
  isLoading=true;
  adminData=null

  ngOnInit(): void {
    this.adminData=this._admin.adminData()
    this._admin.Categories(this.adminData.admin_id).subscribe(data=>{
      this.categories=data
      this.isLoading=false
    },err=>{
      sessionStorage.removeItem("Admin")
      this._router.navigate(['/notFound',err.statusText])
    })
  }
  handleSubmit(data){
    let valid=true
    if(data.category.length>0){
    for(let item of this.categories){
      if(data.category.toLowerCase()===item.category.toLowerCase()){
        valid=false
      }
    }
    if(valid){
      this.ferror=null;
    this._admin.addCategory(data,this.adminData.admin_id).subscribe(result=>{
      this.categories=result
      this.category=""
    },err=>{
      sessionStorage.removeItem("Admin")
      this._router.navigate(['/notFound',err.statusText])
    })
    }
    else{
      this.ferror="Already Available..."
    }
  }
  else{
    this.ferror="invalid input"
  }

  }

}
