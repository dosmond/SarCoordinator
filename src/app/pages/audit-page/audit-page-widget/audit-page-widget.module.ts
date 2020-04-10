import { ReactiveFormsModule } from '@angular/forms';
import { AuditPageWidgetTableComponent } from './audit-page-widget-table/audit-page-widget-table.component';
import { AuditPageWidgetComponent } from './audit-page-widget.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { sarCardModule } from '../../../../@sar/shared/card/card.module';
import { ListModule } from '../../../../@sar/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../@sar/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../@sar/shared/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    sarCardModule,
    ListModule,
    ReactiveFormsModule
  ],
  declarations: [AuditPageWidgetComponent, AuditPageWidgetTableComponent],
  exports: [AuditPageWidgetComponent]
})
export class AuditPageWidgetModule {
}
