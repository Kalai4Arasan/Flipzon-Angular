import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-orders-category',
  templateUrl: './admin-orders-category.component.html',
  styleUrls: ['./admin-orders-category.component.css']
})
export class AdminOrdersCategoryComponent implements OnInit {

  constructor(private _admin:AdminService,private _route:ActivatedRoute) { }
  allOrders=null
  type=null;
  hasSetDate={}
  shipping=null;
  delivery=null;
  ferror=null;
  isLoading=true;
  ngOnInit(): void {
    this._route.paramMap.subscribe(params=>{
      this.type=params.get('type')
      this.isLoading=true
      this._admin.getOrderedCategory(this.type).subscribe(data=>{
        this.allOrders=data
        for(let item of this.allOrders){
            if(item.shiping_date==null && item.delivery_date==null){
              this.hasSetDate[item.buyid]=false
            }
        }
        this.isLoading=false
      })
    })
  }

  setDate(id){
    this.hasSetDate[id]=true;
  }
  addDate(data){
    //console.log(new Date(data.shipping).getTime()>new Date(data.delivery).getTime())
    if(new Date(data.shipping).getTime()>new Date(data.delivery).getTime()){
        return this.ferror="Dates are invalid"
    }
    this._admin.addDates(data).subscribe(data=>{
      if(data.length>0){
        this._admin.getOrderedCategory(this.type).subscribe(data=>{
          this.allOrders=data
          for(let item of this.allOrders){
              if(item.shiping_date==null && item.delivery_date==null){
                this.hasSetDate[item.buyid]=false
              }
          }
        })
      }
    })
  }

}
