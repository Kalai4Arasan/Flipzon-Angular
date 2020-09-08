import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminname=null;
  password=null;
  finalError=false;
  constructor(private _adminService:AdminService,private _route:Router) {
    
   }

  ngOnInit(): void {

  }

  login(data){
    console.log(data)
    this._adminService.adminLogin(data).subscribe(result=>{
      if(result.length>0){
        sessionStorage.setItem('Admin',result[0])
        this._route.navigate(['/admin'])
      }
      else{
        this.finalError=true
      }
  })

  }

}
