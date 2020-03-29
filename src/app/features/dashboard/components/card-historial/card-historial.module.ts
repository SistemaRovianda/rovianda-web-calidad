import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardHistorialComponent } from "./card-historial.component";

const COMMON_DECLARATIONS = [CardHistorialComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [CommonModule],
  exports: COMMON_DECLARATIONS
})
export class CardHistorialModule {}
