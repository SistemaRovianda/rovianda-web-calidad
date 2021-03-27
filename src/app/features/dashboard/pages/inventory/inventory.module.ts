import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
const routes: Routes = [
  {
    path: "",
    component: InventoryComponent
  }
];

@NgModule({
  declarations: [InventoryComponent],
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule
  ]
})
export class InventoryModule { }
