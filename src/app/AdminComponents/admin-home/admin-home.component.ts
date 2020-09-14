import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  title = 'Flipzon-Angular';
  adminData=null;
  constructor(private _route:Router,private _admin:AdminService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('Admin')){
      this.adminData=(jwt_decode(sessionStorage.getItem('Admin')))
      }
    else{
      this._route.navigate(['/adminlogin'])
    }
  }
  // logout(){
  //   sessionStorage.removeItem("Admin")
  //   this.adminData=null
  //   this._route.navigate(['/admin'])
  // }
  logout(){
    this._admin.adminLogout(sessionStorage.getItem('Admin')).subscribe(data=>{
      sessionStorage.removeItem("Admin")
      this.adminData=null
      this._route.navigate(['/adminlogin'])
    },err=>{
      sessionStorage.removeItem("Admin")
      this.adminData=null
      this._route.navigate(['/notFound',err.statusText])
    })
  }
}
