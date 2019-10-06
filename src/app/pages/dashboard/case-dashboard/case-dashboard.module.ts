import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { DashboardRoutingModule } from './case-dashboard-routing.module';
import { CaseDashboardService } from './case-dashboard.service';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { CaseDashboardComponent } from '../case-dashboard/case-dashboard.component';
import { CaseDataWidgetModule } from '../widgets/case-data-widget/case-data-widget.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FurySharedModule,

    // Widgets
    CaseDataWidgetModule,
  ],
  declarations: [CaseDashboardComponent],
  providers: [CaseDashboardService]
})
export class CaseDashboardModule {
}
