import { VolunteerFormDialogComponent } from './../forms/volunteer-form/volunteer-form.component';
import { VolunteerPageRoutingModule } from './volunteer-page-routing.module';
import { ScrollbarModule } from './../../../@fury/shared/scrollbar/scrollbar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FuryCardModule } from './../../../@fury/shared/card/card.module';
import { BreadcrumbsModule } from './../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { BarChartWidgetModule } from './../dashboard/widgets/bar-chart-widget/bar-chart-widget.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorModule } from '../../../@fury/shared/loading-indicator/loading-indicator.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
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
    FurySharedModule,
    BarChartWidgetModule,
    BreadcrumbsModule,
    FuryCardModule,
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
