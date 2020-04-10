import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { sarCardModule } from '../../../../../@sar/shared/card/card.module';
import { ListModule } from '../../../../../@sar/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../../@sar/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sar/shared/material-components.module';
import { CaseDataWidgetTableComponent } from './case-data-widget-table/case-data-widget-table.component';
import { CaseDataWidgetComponent } from './case-data-widget.component';
import { ReportFormModule } from 'src/app/pages/pdf-gen/pdf-gen.module';
import { AddVolunteersModule } from '../../../add-volunteers/add-volunteers.module';
import { IncidentReportModule } from 'src/app/pages/incident-report/incident-report.module';
import { GoogleMapsModule } from '../../../maps/google-maps/google-maps.module';
import { PhotoGridModule } from '../../../components/photo-grid/photo-grid.module';
import { CreateCaseFormModule } from 'src/app/pages/forms/create-case-form/create-case-form.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    ReportFormModule,
    AddVolunteersModule,
    sarCardModule,
    ListModule,
    GoogleMapsModule,
    PhotoGridModule,
    CreateCaseFormModule
  ],
  declarations: [CaseDataWidgetComponent, CaseDataWidgetTableComponent],
  exports: [CaseDataWidgetComponent]
})
export class CaseDataWidgetModule {
}
