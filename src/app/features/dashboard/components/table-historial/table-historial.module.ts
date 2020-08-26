import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableHistorialComponent } from "./table-historial.component";
import { MatButtonModule, MatProgressSpinnerModule } from "@angular/material";
import { CardHistorialModule } from "../card-historial/card-historial.module";
import { SearchPackagingModule } from "../search-packaging/search-packaging.module";
import { SearchDriefModule } from "../search-drief/search-drief.module";
import { HistoryListModule } from "../histoy-list/history-list.module";

const DECLARATIONS = [TableHistorialComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    MatButtonModule,
    CardHistorialModule,
    MatProgressSpinnerModule,
    SearchPackagingModule,
    SearchDriefModule,
    HistoryListModule,
  ],
  exports: DECLARATIONS,
})
export class TableHistorialModule {}
