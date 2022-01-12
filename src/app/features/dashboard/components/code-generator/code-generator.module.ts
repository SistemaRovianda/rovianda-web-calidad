import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeGeneratorComponent } from './code-generator.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [CodeGeneratorComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [CodeGeneratorComponent]
})
export class CodeGeneratorModule { }
