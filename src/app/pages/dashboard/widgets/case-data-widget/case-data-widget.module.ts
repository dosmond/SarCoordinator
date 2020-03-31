import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../../../../@fury/shared/card/card.module';
import { ListModule } from '../../../../../@fury/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../../@fury/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@fury/shared/material-components.module';
import { CaseDataWidgetTableComponent } from './case-data-widget-table/case-data-widget-table.component';
import { CaseDataWidgetComponent } from './case-data-widget.component';
import { ReportFormModule } from 'src/app/pages/pdf-gen/pdf-gen.module';
import { AddVolunteersModule } from '../../../add-volunteers/add-volunteers.module';
import { IncidentReportModule } from 'src/app/pages/incident-report/incident-report.module';
import { GoogleMapsModule } from '../../../maps/google-maps/google-maps.module';
import { PhotoGridModule } from '../../../components/photo-grid/photo-grid.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    ReportFormModule,
    AddVolunteersModule,
    FuryCardModule,
    ListModule,
    GoogleMapsModule,
    PhotoGridModule,
  ],
  declarations: [CaseDataWidgetComponent, CaseDataWidgetTableComponent],
  exports: [CaseDataWidgetComponent]
})
export class CaseDataWidgetModule {
}
