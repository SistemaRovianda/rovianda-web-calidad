import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalSelectFormatComponent } from './modal-select-format.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [ModalSelectFormatComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [ModalSelectFormatComponent]
})
export class ModalSelectFormatModule { }
