import { HttpClientModule } from '@angular/common/http';
import { ReportFormModule } from './../pdf-gen/pdf-gen.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { BarChartWidgetModule } from './widgets/bar-chart-widget/bar-chart-widget.module';
import { DonutChartWidgetModule } from './widgets/donut-chart-widget/donut-chart-widget.module';
import { LineChartWidgetModule } from './widgets/line-chart-widget/line-chart-widget.module';
import { MapsWidgetModule } from './widgets/maps-widget/maps-widget.module';
import { RecentSalesWidgetModule } from './widgets/recent-sales-widget/recent-sales-widget.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './dashboard.service';
import { VolunteerFormModule } from '../forms/volunteer-form/volunteer-form.module';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { CreateCaseFormModule } from '../forms/create-case-form/create-case-form.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FurySharedModule,

    // Widgets
    BarChartWidgetModule,
    LineChartWidgetModule,
    DonutChartWidgetModule,
    RecentSalesWidgetModule,
    DonutChartWidgetModule,
    MapsWidgetModule,
    VolunteerFormModule,
    CreateCaseFormModule,
    ReportFormModule,
    HttpClientModule,
  ],
  declarations: [DashboardComponent],
  providers: [DashboardService]
})
export class DashboardModule {
}
