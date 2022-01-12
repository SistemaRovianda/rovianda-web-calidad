import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientFormComponent } from './ingredient-form.component';

import {MatRadioModule} from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';


@NgModule({
  declarations: [IngredientFormComponent],
  imports: [
    CommonModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports: [IngredientFormComponent]
})
export class IngredientFormModule { }
