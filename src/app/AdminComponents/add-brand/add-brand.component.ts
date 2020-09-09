import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  brands=null;
  isLoading=true;
  categories=null;
  brand="";
  totalBrands=[];
  category=null;
  categoryList=[];
  ferror=null;
  constructor(private _admin:AdminService) { }

  ngOnInit(): void {
    let Data={}
    this._admin.Brands().subscribe(data=>{
      for(let item of data){
        this.totalBrands.push(item.brand)
        if(item.brand in Data){
            Data[item.brand].push(item.category)
        }
        else{
            Data[item.brand]=[item.category]
        }
      }
      this.brands=Data
      this._admin.Categories().subscribe(data=>{
        this.categories=data
      })
      this.isLoading=false
    })
  }
  handleCategory(){
    this.ferror=null
    if(this.categoryList.indexOf(this.category)==-1 &&this.category!=null&& this.category.length>0){
      this.categoryList.push(this.category)
    }
    else{
      this.ferror="Invalid Input"
    }
  }
  cancelCategory(item){
    this.categoryList.splice(item,1)
  }
  handleSubmit(data){
    this.ferror=null
    if(data.brand.length>0 && this.categoryList.length>0){
        for(let item of this.totalBrands){
          if(data.brand.toLowerCase()==item.toLowerCase()){
            return this.ferror="this brand is already available "
          }
        }
        if(this.ferror==null || this.ferror.length==0){
          this._admin.addBrand({'CategoryList':this.categoryList,'brand':this.brand}).subscribe(data=>{
            let Data={}
            this.totalBrands.push(this.brand)
            this._admin.Brands().subscribe(data=>{
              for(let item of data){
                if(item.brand in Data){
                    Data[item.brand].push(item.category)
                }
                else{
                    Data[item.brand]=[item.category]
                }
              }
              this.brands=Data
              this._admin.Categories().subscribe(data=>{
                this.categories=data
              })
              this.isLoading=false
            })
          })
        }
        
    }
    else{
      this.ferror="invalid input"
    }
  }

}
