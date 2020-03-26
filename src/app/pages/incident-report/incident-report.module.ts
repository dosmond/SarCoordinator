import { FuryCardModule } from './../../../@fury/shared/card/card.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { IncidentReportComponent } from './incident-report.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { IncidentReportService } from './incident-report.service';

@NgModule({
    imports: [
      CommonModule,
      MaterialModule,
      ReactiveFormsModule,
      NgxPrintModule,
      FurySharedModule,
      FuryCardModule
    ],
    declarations: [IncidentReportComponent],
    entryComponents: [IncidentReportComponent],
    providers: [IncidentReportService]
  })
  export class IncidentReportModule {}