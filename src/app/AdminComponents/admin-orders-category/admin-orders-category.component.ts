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
  ngOnInit(): void {
    this._route.paramMap.subscribe(params=>{
      this.type=params.get('type')
      this._admin.getOrderedCategory(this.type).subscribe(data=>{
        this.allOrders=data
      })
    })
  }

}
