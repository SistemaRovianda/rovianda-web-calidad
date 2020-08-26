import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardDateComponent } from "./card-date.component";
import {
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
