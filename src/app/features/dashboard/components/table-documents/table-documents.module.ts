import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableDocumentsComponent } from "./table-documents.component";
import { CardDocumentModule } from "../card-document/card-document.module";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { SearchPackagingModule } from "../search-packaging/search-packaging.module";

const COMMON_DECLARATIONS = [TableDocumentsComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [
    CommonModule,
    CardDocumentModule,
    MatProgressSpinnerModule,
  ],
  exports: COMMON_DECLARATIONS,
})
export class TableDocumentsModule {}
