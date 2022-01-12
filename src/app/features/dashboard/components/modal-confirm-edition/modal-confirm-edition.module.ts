import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalConfirmEditionComponent } from './modal-confirm-edition.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ModalConfirmEditionComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [ModalConfirmEditionComponent]
})
export class ModalConfirmEditionModule { }
