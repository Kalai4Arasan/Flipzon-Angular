import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http:HttpClient) { }
  adminLogin(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/adminLogin',{Admin:data})
  }
  Brands():Observable<any>{
    return this._http.get<any>('http://localhost:3000/getBrands')
  }
  Categories():Observable<any>{
    return this._http.get<any>('http://localhost:3000/getCategories')
  }
  addBrand(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/addBrand',{Brand:data})
  }
  addCategory(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/addCategory',{Category:data.category})
  }
  getOrderedCategory(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/allOrders',{cid:data})
  }
}
