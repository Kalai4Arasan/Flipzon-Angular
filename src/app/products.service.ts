import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { products } from './products';
import { reviews } from './reviews';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http:HttpClient) { 
  }
  getProducts(category):Observable<products[]>{
      return this._http.get<products[]>('http://localhost:3000/getProducts',{params:{'category':category}})
  }
  getOfferedProducts(category):Observable<products[]>{
    return this._http.get<products[]>('http://localhost:3000/getOfferedProducts',{params:{'category':category}})
}
  getOneProduct(productname):Observable<products[]>{
      return this._http.get<products[]>('http://localhost:3000/getOneProduct',{params:{'productname':productname}})
  }
  getReviews(pid):Observable<reviews[]>{
      console.log(pid)
      return this._http.post<reviews[]>('http://localhost:3000/getReviews',{Data:pid})
  }
  addCart(uid,pid):Observable<any>{
      let Product={
        'uid':uid,
        'pid':pid,
        'jwtToken':sessionStorage.getItem("User"),
      }
      return this._http.post<any>('http://localhost:3000/addtocart',{Product,jwtToken:sessionStorage.getItem("User")})
  }
  buyProduct(Data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/buyproduct',{Data,jwtToken:sessionStorage.getItem("User")})
  }

  getCarts(uid):Observable<any>{
      //console.log(uid)
      return this._http.post<any>('http://localhost:3000/cart',{User:uid,jwtToken:sessionStorage.getItem("User")})
  }
  getCartCount(uid):Observable<any>{
    //console.log(uid)
      return this._http.post<any>('http://localhost:3000/getCartCount',{User:uid,jwtToken:sessionStorage.getItem("User")})
  }
  deleteCart(cid,uid):Observable<any>{
    let Data={
      'cid':cid,
      'uid':uid,
    }
    return this._http.post<any>('http://localhost:3000/deleteCart',{Data,jwtToken:sessionStorage.getItem("User")})
  }
  getOrderedCategory(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/orderedproducts',{User:data,jwtToken:sessionStorage.getItem("User")})
  }
  cancelProduct(id):Observable<any>{
    return this._http.post<any>('http://localhost:3000/cancelProduct',{Product:{'buyid':id},jwtToken:sessionStorage.getItem("User")})
  }
  getReviewId(id):Observable<any>{
    return this._http.post<any>('http://localhost:3000/allReviews',{Data:id,jwtToken:sessionStorage.getItem("User")})
  }
  addReview(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/addReview',{Data:data,jwtToken:sessionStorage.getItem("User")})
  }
}
