import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableHistorialComponent } from "./table-historial.component";
import { MatButtonModule, MatProgressSpinnerModule } from "@angular/material";
import { CardHistorialModule } from "../card-historial/card-historial.module";

const DECLARATIONS = [TableHistorialComponent];

@NgModule({
  declarations: DECLARATIONS,
  imports: [
    CommonModule,
    MatButtonModule,
    CardHistorialModule,
    MatProgressSpinnerModule
  ],
  exports: DECLARATIONS
})
export class TableHistorialModule {}
