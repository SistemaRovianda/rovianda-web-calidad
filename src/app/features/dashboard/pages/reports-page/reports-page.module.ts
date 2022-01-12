import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReportsPageComponent } from "./reports-page.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";

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
