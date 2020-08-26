import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchPackagingComponent } from "./search-packaging.component";
import { MatTableModule } from "@angular/material";

const COMMON_DECLARATIONS = [SearchPackagingComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [CommonModule, MatTableModule],
  exports: COMMON_DECLARATIONS,
})
export class SearchPackagingModule {}
