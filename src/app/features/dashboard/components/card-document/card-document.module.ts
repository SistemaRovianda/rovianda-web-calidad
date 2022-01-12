import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardDocumentComponent } from './card-document.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

const COMMON_DECLARATIONS = [CardDocumentComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [CommonModule, MatButtonModule, FlexLayoutModule,MatProgressSpinnerModule],
  exports: COMMON_DECLARATIONS
})
export class CardDocumentModule {}
