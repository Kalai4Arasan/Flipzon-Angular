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

  ngOnInit(): void {
    if(jwt_decode(sessionStorage.getItem("Admin")).admin_name==null || jwt_decode(sessionStorage.getItem("Admin")).admin_name.length==0 ){
      sessionStorage.removeItem("Admin")
      this._router.navigate(['/notFound','UnAuthorized'])
    }
    this._admin.Categories().subscribe(data=>{
      this.categories=data
      this.isLoading=false
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
    this._admin.addCategory(data).subscribe(result=>{
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
