import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ProductsService } from 'src/app/products.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  constructor(private route:ActivatedRoute,private _productService:ProductsService,private _router:Router) { }
  category:string;
  productData=null;
  brands=null;
  filterBrand=[];
  filterBrandTags={};
  min=null;
  max=null;
  isLoading=true;
  rateError=false;
  finalMinRate=null;
  finalMaxRate=null;
  filteredData=null;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
        this.productData=null;
        this.brands=null;
        this.filterBrand=[];
        this.filterBrandTags={};
        this.min=null;
        this.max=null;
        this.isLoading=true;
        this.rateError=false;
        this.finalMinRate=null;
        this.finalMaxRate=null;
        this.filteredData=null;
        this.category=params.get('category')
        if(this.category!="OfferZone"){
          this._productService.getProducts(this.category)
          .subscribe(data=>{
            this.productData=data
            this.isLoading=false
            console.log(this.productData)
            this.setUniqueCategory(data)
          })
        }
        else{
          this._productService.getOfferedProducts(this.category)
          .subscribe(data=>{
            this.productData=data
            this.isLoading=false
            console.log(this.productData)
            this.setUniqueCategory(data)
          })
        }
    })
  }
  setUniqueCategory(data){
    let s=new Set()
    for(let item of data){
      s.add(item.brand)
    }
    this.brands=Array.from(s)
  }
  cancelRate(){
    this.finalMinRate=null
    this.finalMaxRate=null
    this.filter()
  }
  submitRate(){
    if(this.min<this.max){
      this.finalMinRate=this.min
      this.finalMaxRate=this.max
      this.rateError=false
      this.filter()
    }
    else{
      this.rateError=true
    }
  }
  cancelBrand(item){
    this.filterBrand.splice(this.filterBrand.indexOf(item),1)
    this.filterBrandTags[item].checked=false
    this.filter()
  }
  handleBrand(tag){
    this.filterBrandTags[tag.value]=tag
    if(tag.checked){
      if(this.filterBrand.indexOf(tag.value)==-1){
        this.filterBrand.push(tag.value)
      }
    }
    else{
      this.filterBrand.splice(this.filterBrand.indexOf(tag.value),1)
    }
    this.filterBrand=this.filterBrand
    this.filter()
  }

  filter(){
    let Data=[]
    if(this.filterBrand.length>0 && this.finalMinRate>0 && this.finalMaxRate>0){
          for(let i of this.productData){
            if(this.filterBrand.indexOf(i.brand)>=0 && (i.rate-i.discount)>=this.finalMinRate && (i.rate-i.discount)<=this.finalMaxRate){
              Data.push(i)
            }
          }
    }
    else if(this.finalMinRate>0 && this.finalMaxRate>0){
        for(let i of this.productData){
          if((i.rate-i.discount)>=this.finalMinRate && (i.rate-i.discount)<=this.finalMaxRate){
            Data.push(i)
          }
        }
    }
    else if(this.filterBrand.length>0){
        for(let i of this.productData){
          if(this.filterBrand.indexOf(i.brand)>=0){
            Data.push(i)
          }
        }
    }
    else{
      Data=null
    }
    this.filteredData=Data

  }
}

