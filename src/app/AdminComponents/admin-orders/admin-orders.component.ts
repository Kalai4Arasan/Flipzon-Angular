import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private _admin:AdminService) { }
  categories=null
  ngOnInit(): void {
    this._admin.Categories().subscribe(data=>{
      this.categories=data
    })
  }

}
