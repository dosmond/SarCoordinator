import { VolunteerFormDialogComponent } from './../forms/volunteer-form/volunteer-form.component';
import { VolunteerPageRoutingModule } from './volunteer-page-routing.module';
import { ScrollbarModule } from './../../../@sar/shared/scrollbar/scrollbar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { sarCardModule } from './../../../@sar/shared/card/card.module';
import { BreadcrumbsModule } from './../../../@sar/shared/breadcrumbs/breadcrumbs.module';
import { BarChartWidgetModule } from './../dashboard/widgets/bar-chart-widget/bar-chart-widget.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorModule } from '../../../@sar/shared/loading-indicator/loading-indicator.module';
import { MaterialModule } from '../../../@sar/shared/material-components.module';
import { SarSharedModule } from '../../../@sar/sar-shared.module';
import { VolunteerPageComponent } from './volunteer-page.component';
import { VolunteerService } from './volunteer-page.service';
import { RecentSalesWidgetModule } from '../dashboard/widgets/recent-sales-widget/recent-sales-widget.module';
import { VolunteerFormModule } from '../forms/volunteer-form/volunteer-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LoadingIndicatorModule,
    SarSharedModule,
    BarChartWidgetModule,
    BreadcrumbsModule,
    sarCardModule,
    DragDropModule,
    ScrollbarModule,
    RecentSalesWidgetModule,
    VolunteerPageRoutingModule,
    VolunteerFormModule,
  ],
  declarations: [VolunteerPageComponent],
  providers: [VolunteerService, DatePipe]
})
export class VolunteerPageModule {
}
