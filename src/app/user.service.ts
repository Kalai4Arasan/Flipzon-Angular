import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }

  userLogin(data):Observable<any>{
    return this._http.post<any>('http://localhost:3000/login',{User:data})
  }
}
