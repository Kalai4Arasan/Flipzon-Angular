import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { products } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _http:HttpClient) { }
  getProducts(category):Observable<products[]>{
      return this._http.get<products[]>('http://localhost:3000/getProducts',{params:{'category':category}})
  }
}
