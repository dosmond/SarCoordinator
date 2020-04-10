import { ScrollbarModule } from './../../../@sar/shared/scrollbar/scrollbar.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { sarCardModule } from './../../../@sar/shared/card/card.module';
import { BreadcrumbsModule } from './../../../@sar/shared/breadcrumbs/breadcrumbs.module';
import { BarChartWidgetModule } from './../dashboard/widgets/bar-chart-widget/bar-chart-widget.module';
import { AuditPageService } from './audit-page.service';
import { AuditPageWidgetModule } from './audit-page-widget/audit-page-widget.module';
import { AuditPageRoutingModule } from './audit-page-routing.module';
import { AuditPageComponent } from './audit-page.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorModule } from '../../../@sar/shared/loading-indicator/loading-indicator.module';
import { MaterialModule } from '../../../@sar/shared/material-components.module';
import { SarSharedModule } from '../../../@sar/sar-shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LoadingIndicatorModule,
    SarSharedModule,
    AuditPageRoutingModule,
    AuditPageWidgetModule,
    BarChartWidgetModule,
    BreadcrumbsModule,
    sarCardModule,
    DragDropModule,
    ScrollbarModule
  ],
  declarations: [AuditPageComponent],
  providers: [AuditPageService, DatePipe]
})
export class AuditPageModule {
}
