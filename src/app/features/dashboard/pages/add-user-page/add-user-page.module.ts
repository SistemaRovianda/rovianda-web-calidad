import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AddUserPageComponent } from "./add-user-page.component";
import { FlexLayoutModule } from "@angular/flex-layout";



import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";

const routes: Routes = [
  {
    path: "",
    component: AddUserPageComponent
  }
];

const COMMON_DECLARATIONS = [AddUserPageComponent];

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
];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS
})
export class AddUserPageModule {}
