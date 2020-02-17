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
  ],
  declarations: [AuditPageComponent],
  providers: [AuditPageService, DatePipe]
})
export class AuditPageModule {
}
