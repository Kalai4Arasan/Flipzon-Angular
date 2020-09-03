import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowProductsComponent } from './UserComponents/show-products/show-products.component';
import { HomeComponent } from './UserComponents/home/home.component';
import { LoginComponent } from './UserComponents/login/login.component';
import { RegisterComponent } from './UserComponents/register/register.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'home'},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'user',component:HomeComponent,children:[
    {path:'showproducts/:category',component:ShowProductsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
