import { ReactiveFormsModule } from '@angular/forms';
import { AuditPageWidgetTableComponent } from './audit-page-widget-table/audit-page-widget-table.component';
import { AuditPageWidgetComponent } from './audit-page-widget.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../../../@fury/shared/card/card.module';
import { ListModule } from '../../../../@fury/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../@fury/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    FuryCardModule,
    ListModule,
    ReactiveFormsModule
  ],
  declarations: [AuditPageWidgetComponent, AuditPageWidgetTableComponent],
  exports: [AuditPageWidgetComponent]
})
export class AuditPageWidgetModule {
}
