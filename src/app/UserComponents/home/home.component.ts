import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Flipzon-Angular';
  userData=null;
  cartCount=0

  logout(){
    sessionStorage.removeItem("User")
    this.userData=null
  }
  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem('User')){
    this.userData=(jwt_decode(sessionStorage.getItem('User')))
    }
  }

}
