import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableReceptionsFilterComponent } from './table-receptions-filter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from "@angular/material/stepper"
import { ModalSelectFormatModule } from '../modal-select-format/modal-select-format.module';
import { ModalSelectFormatComponent } from '../modal-select-format/modal-select-format.component';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [TableReceptionsFilterComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
    ModalSelectFormatModule,
    MatDialogModule
  ],
  exports: [TableReceptionsFilterComponent],
  entryComponents:[ModalSelectFormatComponent]
})
export class TableReceptionsFilterModule { }
