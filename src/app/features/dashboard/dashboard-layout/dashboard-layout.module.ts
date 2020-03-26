import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { DashboardLayoutComponent } from "./dashboard-layout.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent
  }
];

const DECLARATIONS = [DashboardLayoutComponent];

const IMPORTS = [
  CommonModule,
  RouterModule.forChild(routes),
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
