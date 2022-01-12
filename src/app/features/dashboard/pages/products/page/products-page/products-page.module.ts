import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsPageComponent } from './products-page.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ProductDetailsModule } from '../../components/product-details/product-details.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ProductDetailsComponent } from '../../components/product-details/product-details.component';


const routes: Routes = [
  {
    path: "",
    component: ProductsPageComponent
  }
];
@NgModule({
  declarations: [ProductsPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatDialogModule
  ],
  entryComponents:[]
})
export class ProductsPageModule { }
