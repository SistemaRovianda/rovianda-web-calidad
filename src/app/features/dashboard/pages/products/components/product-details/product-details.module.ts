import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';
import { IngredientFormModule } from '../ingredient-form/ingredient-form.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';


const routes: Routes = [
  {
    path: "",
    component: ProductDetailsComponent
  }
];
@NgModule({
  declarations: [ProductDetailsComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    IngredientFormModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports:[ProductDetailsComponent],
  entryComponents:[IngredientFormComponent]
})
export class ProductDetailsModule { }
