import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReportsPageComponent } from "./reports-page.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatIconRegistry,
  MatCheckboxModule
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: ReportsPageComponent
  }
];

const COMMON_DECLARATIONS = [ReportsPageComponent];

const COMMON_IMPORTS = [
  CommonModule,
  RouterModule.forChild(routes),
  FlexLayoutModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  FormsModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatButtonToggleModule,
  MatCheckboxModule
];

const COMMON_PROVIDER = [MatIconRegistry];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  providers: COMMON_PROVIDER
})
export class ReportsPageModule {}
