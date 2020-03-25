import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "./login-page.component";
import {
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatIconRegistry,
  MatDividerModule
} from "@angular/material";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";
const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  }
];

const DECLARATIONS = [LoginPageComponent];

const IMPORTS = [
  CommonModule,
  RouterModule.forChild(routes),
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  FormsModule,
  ReactiveFormsModule,
  FlexLayoutModule,
  HttpClientModule,
  MatDividerModule
];

const EXPORTS = [LoginPageComponent];

const PROVIDERS = [HttpClientModule,MatIconRegistry];
@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS,
  exports: EXPORTS,
  providers: PROVIDERS
})
export class LoginPageModule {}
