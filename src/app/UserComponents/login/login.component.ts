import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username=null;
  password=null;
  finalError=false;
  url=[""]
  constructor(private _userService:UserService,private _route:Router) {
    if(history.state.url){
      this.url=history.state.url
    }
   }
  
  ngOnInit(): void {
  }

  login(){
    let data={
      'username':this.username,
      'password':this.password
    }
    this._userService.userLogin(data).subscribe(result=>{
      if(result.length>0){
        sessionStorage.setItem('User',result[0])
        this._route.navigate(this.url)
      }
      else{
        this.finalError=true
      }
  })

  }

}
