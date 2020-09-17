import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';
import { products } from '../../products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  constructor(private _admin:AdminService) { }
  isLoading=true
  products=null;
  adminData=null;
  ngOnInit(): void {
    this.adminData=this._admin.adminData()
    this._admin.allProducts(this.adminData.admin_id).subscribe(data=>{
      this.products=data
      this.isLoading=false
    })
  }

}
