import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private _admin:AdminService) { }
  category="";
  categories=[];
  ferror=null;
  isLoading=true;

  ngOnInit(): void {
    this._admin.Categories().subscribe(data=>{
      this.categories=data
      this.isLoading=false
    })
  }
  handleSubmit(data){
    let valid=true
    for(let item of this.categories){
      if(data.category.toLowerCase()===item.category.toLowerCase()){
        valid=false
      }
    }
    if(valid){
      this.ferror=null;
    this._admin.addCategory(data).subscribe(result=>{
      this.categories=result
      this.category=""
    })
    }
    else{
      this.ferror="Already Available..."
    }

  }

}
