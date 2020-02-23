import { ScrollbarModule } from './../../../@fury/shared/scrollbar/scrollbar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FuryCardModule } from './../../../@fury/shared/card/card.module';
import { BreadcrumbsModule } from './../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { BarChartWidgetModule } from './../dashboard/widgets/bar-chart-widget/bar-chart-widget.module';
import { AuditPageService } from './audit-page.service';
import { AuditPageWidgetModule } from './audit-page-widget/audit-page-widget.module';
import { AuditPageRoutingModule } from './audit-page-routing.module';
import { AuditPageComponent } from './audit-page.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorModule } from '../../../@fury/shared/loading-indicator/loading-indicator.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../@fury/fury-shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LoadingIndicatorModule,
    FurySharedModule,
    AuditPageRoutingModule,
    AuditPageWidgetModule,
    BarChartWidgetModule,
    BreadcrumbsModule,
    FuryCardModule,
    DragDropModule,
    ScrollbarModule
  ],
  declarations: [AuditPageComponent],
  providers: [AuditPageService, DatePipe]
})
export class AuditPageModule {
}
