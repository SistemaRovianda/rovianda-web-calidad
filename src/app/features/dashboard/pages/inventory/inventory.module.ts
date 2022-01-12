import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { RouterModule, Routes } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalConfirmEditionModule } from '../../components/modal-confirm-edition/modal-confirm-edition.module';
import { ModalConfirmEditionComponent } from '../../components/modal-confirm-edition/modal-confirm-edition.component';
import { MatTooltipModule } from '@angular/material/tooltip';


const routes: Routes = [
  {
    path: "",
    component: InventoryComponent
  }
];

@NgModule({
  declarations: [InventoryComponent],
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    RouterModule.forChild(routes),
    MatProgressSpinnerModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatDialogModule,
    ModalConfirmEditionModule,
    MatTooltipModule
  ],
  providers:[{provide:MAT_DATE_LOCALE,useValue:"es-mx"}],
  entryComponents:[ModalConfirmEditionComponent]
})
export class InventoryModule { }
