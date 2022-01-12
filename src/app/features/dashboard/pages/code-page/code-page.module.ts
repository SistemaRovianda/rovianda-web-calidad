import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodePageComponent } from './code-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CodeGeneratorModule } from '../../components/code-generator/code-generator.module';


const routes: Routes = [
  {
    path: "",
    component: CodePageComponent
  }
];
@NgModule({
  declarations: [CodePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CodeGeneratorModule
  ]
})
export class CodePageModule { }
