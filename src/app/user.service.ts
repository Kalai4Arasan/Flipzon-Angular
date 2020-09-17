import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  userLogin(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/login',{User:data})
  }
  userLogout(token):Observable<any>{
    return this._http.post<any>('http://localhost:3000/logout',{jwtToken:token,uid:jwt_decode(sessionStorage.getItem("User")).id})
  }
}
