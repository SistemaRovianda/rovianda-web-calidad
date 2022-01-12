import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardDateComponent } from "./card-date.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";

const COMMON_DECLARATIONS = [CardDateComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  exports: COMMON_DECLARATIONS,
})
export class CardDateModule {}
