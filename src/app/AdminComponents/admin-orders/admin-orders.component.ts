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
  adminData=null
  ngOnInit(): void {
    this.adminData=this._admin.adminData()
    this._admin.Categories(this.adminData.admin_id).subscribe(data=>{
      this.categories=data
    })
  }

}
