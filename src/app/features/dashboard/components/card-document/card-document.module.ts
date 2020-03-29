import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CardDocumentComponent } from './card-document.component';
import { MatButtonModule, MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

const COMMON_DECLARATIONS = [CardDocumentComponent];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: [CommonModule, MatButtonModule, FlexLayoutModule,MatProgressSpinnerModule],
  exports: COMMON_DECLARATIONS
})
export class CardDocumentModule {}
