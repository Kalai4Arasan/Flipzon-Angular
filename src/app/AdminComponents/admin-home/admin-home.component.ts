import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  title = 'Flipzon-Angular';
  adminData=null;
  constructor(private _route:Router) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('Admin')){
      this.adminData=(jwt_decode(sessionStorage.getItem('Admin')))
      }
    else{
      this._route.navigate(['/adminlogin'])
    }
  }
  logout(){
    sessionStorage.removeItem("Admin")
    this.adminData=null
    this._route.navigate(['/admin'])
  }

}
