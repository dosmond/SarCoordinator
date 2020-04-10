import { sarCardModule } from './../../../@sar/shared/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/@sar/shared/material-components.module';
import { IncidentReportComponent } from './incident-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { SarSharedModule } from '../../../@sar/sar-shared.module';
import { IncidentReportService } from './incident-report.service';

@NgModule({
    imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
      NgxPrintModule,
      SarSharedModule,
      sarCardModule
    ],
    declarations: [IncidentReportComponent],
    entryComponents: [IncidentReportComponent],
    providers: [IncidentReportService]
  })
  export class IncidentReportModule {}