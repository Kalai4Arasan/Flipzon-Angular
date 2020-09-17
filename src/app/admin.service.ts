import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient,private _route:Router) { }
  adminData(){
    if(sessionStorage.getItem('Admin')){
      return (jwt_decode(sessionStorage.getItem('Admin')))
      }
    else{
      this._route.navigate(['/adminlogin'])
    }
  }
  adminLogin(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/adminLogin',{Admin:data})
  }
  adminLogout(token,admin_id):Observable<any>{
    return this._http.post<any>('http://localhost:3000/adminLogout',{jwtToken:token,aid:admin_id})
  }
  Brands(aid):Observable<any>{
    return this._http.post<any>('http://localhost:3000/getBrands',{jwtToken:sessionStorage.getItem("Admin"),aid:aid})
  }
  Categories(aid):Observable<any>{
    return this._http.post<any>('http://localhost:3000/getCategories',{jwtToken:sessionStorage.getItem("Admin"),aid:aid})
  }
  addBrand(data,aid):Observable<any>{
    return this._http.post<any>('http://localhost:3000/addBrand',{Brand:data,jwtToken:sessionStorage.getItem("Admin"),aid:aid})
  }
  addCategory(data,aid):Observable<any>{
    return this._http.post<any>('http://localhost:3000/addCategory',{Category:data.category,jwtToken:sessionStorage.getItem("Admin"),aid:aid})
  }
  getOrderedCategory(data,aid):Observable<any>{
    return this._http.post<any>('http://localhost:3000/allOrders',{cid:data,jwtToken:sessionStorage.getItem("Admin"),aid:aid})
  }
  addDates(data,aid):Observable<any>{
    return this._http.post<any>('http://localhost:3000/addDates',{Dates:data,jwtToken:sessionStorage.getItem("Admin"),aid:aid})
  }
  allProducts(aid):Observable<any>{
    return this._http.post<any>('http://localhost:3000/allProducts',{jwtToken:sessionStorage.getItem("Admin"),aid:aid})
  }
  addProduct(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/addNewProduct',data)
  }
}
