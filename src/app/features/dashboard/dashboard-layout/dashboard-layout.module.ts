import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatCardModule,
  
} from "@angular/material/card";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";


const DECLARATIONS = [DashboardLayoutComponent];

const IMPORTS = [
  CommonModule,
  RouterModule,
  FlexLayoutModule,
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  FormsModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS
})
export class DashboardLayoutModule {}
