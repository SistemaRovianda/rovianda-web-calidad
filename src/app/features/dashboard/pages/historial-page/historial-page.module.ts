import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HistorialPageComponent } from "./historial-page.component";
import { Routes, RouterModule } from "@angular/router";
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MAT_DATE_LOCALE,
} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TableHistorialModule } from "../../components/table-historial/table-historial.module";
import { TableDocumentsModule } from "../../components/table-documents/table-documents.module";
import { CardDateModule } from "../../components/card-date/card-date.module";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TableReceptionsModule } from "../../components/table-receptions/table-receptions.module";
import { TableReceptionsComponent } from "../../components/table-receptions/table-receptions.component";
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
  TableReceptionsModule
];

@NgModule({
  declarations: COMMON_DECLARATIONS,
  imports: COMMON_IMPORTS,
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  entryComponents:[TableReceptionsComponent]
})
export class HistorialPageModule {}
