import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistoryListComponent } from "./history-list.component";
import { MatTableModule } from "@angular/material/table";

const COMMON_DECLARATIONS = [HistoryListComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [CommonModule, MatTableModule],
  exports: COMMON_DECLARATIONS,
})
export class HistoryListModule {}
