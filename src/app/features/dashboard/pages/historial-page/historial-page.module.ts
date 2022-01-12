import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistorialPageComponent } from "./historial-page.component";
import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableHistorialModule } from "../../components/table-historial/table-historial.module";
import { TableDocumentsModule } from "../../components/table-documents/table-documents.module";
import { CardDateModule } from "../../components/card-date/card-date.module";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TableReceptionsModule } from "../../components/table-receptions/table-receptions.module";
import { TableReceptionsComponent } from "../../components/table-receptions/table-receptions.component";
import { SearhHistoryFilterModule } from "../../components/searh-history-filter/searh-history-filter.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { TableReceptionsFilterModule } from "../../components/table-receptions-filter/table-receptions-filter.module";
import { MatExpansionModule } from "@angular/material/expansion";
import {MatSelectModule} from '@angular/material/select';
import { ModalSelectFormatModule } from "../../components/modal-select-format/modal-select-format.module";

const routes: Routes = [
  {
    path: "",
    component: HistorialPageComponent,
  },
];

const COMMON_DECLARATIONS = [HistorialPageComponent];

const COMMON_IMPORTS = [
  CommonModule,
  RouterModule.forChild(routes),
  FlexLayoutModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  FormsModule,
  ReactiveFormsModule,
  TableHistorialModule,
  TableDocumentsModule,
  CardDateModule,
  MatDatepickerModule,
  TableReceptionsModule,
  SearhHistoryFilterModule,
  TableReceptionsFilterModule,
  MatExpansionModule,
  MatSelectModule,
  ModalSelectFormatModule
];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-mx' }],
  entryComponents:[TableReceptionsComponent]
})
export class HistorialPageModule {}
