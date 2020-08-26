import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchDriefComponent } from './search-drief.component';
import { MatTableModule } from '@angular/material';



const COMMON_DECLARATIONS = [SearchDriefComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [CommonModule, MatTableModule],
  exports: COMMON_DECLARATIONS,
})
export class SearchDriefModule { }
