import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableReceptionsComponent } from './table-receptions.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [TableReceptionsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports:[TableReceptionsComponent]
})
export class TableReceptionsModule { }
