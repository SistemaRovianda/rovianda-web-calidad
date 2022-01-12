import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductCatalog } from 'src/app/shared/models/inventory.interface';
import { HistorialService } from 'src/app/shared/Services/historial.service';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  constructor(private historialService:HistorialService,private dialog:MatDialog,private router:Router) { }

  products:ProductCatalog[]=[];
  ngOnInit(): void {
    this.historialService.getOnlyProductOfQualityArea().subscribe((rows)=>{
      this.products=rows;
    },(err)=>{
      this.products=[];
    });
  }

  openDetails(id:number){
      this.router.navigateByUrl("/dashboard/productos/"+id);
  }

}
