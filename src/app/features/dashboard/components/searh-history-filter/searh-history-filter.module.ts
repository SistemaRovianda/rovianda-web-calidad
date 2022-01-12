import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearhHistoryFilterComponent } from './searh-history-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [SearhHistoryFilterComponent],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule
  ],
  exports: [SearhHistoryFilterComponent],
  providers:[{provide:MAT_DATE_LOCALE,useValue:"es-mx"}]
})
export class SearhHistoryFilterModule { }
