import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@sar/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../@sar/shared/list/list.module';
import { MaterialModule } from '../../../@sar/shared/material-components.module';
import { ShiftLogsRoutingModule } from './shift-logs-routing.module';
import { ShiftLogsComponent } from './shift-logs.component';
import { ShiftUpdateModule } from './shift-update/shift-update.module';
import { SarSharedModule } from '../../../@sar/sar-shared.module';
import { sarCardModule } from '../../../@sar/shared/card/card.module';
import { ShiftLogService } from './shift-log.service';
import { LoadingOverlayModule } from '../../../@sar/shared/loading-overlay/loading-overlay.module';
import { VehicleListModule } from './vehicle-list/vehicle-list.module';

@NgModule({
  imports: [
    CommonModule,
    ShiftLogsRoutingModule,
    FormsModule,
    MaterialModule,
    SarSharedModule,
    sarCardModule,

    // Core
    LoadingOverlayModule,
    ListModule,
    ShiftUpdateModule,
    VehicleListModule,
    BreadcrumbsModule
  ],
  declarations: [ShiftLogsComponent],
  exports: [ShiftLogsComponent],
  providers: [ShiftLogService]
})
export class ShiftLogsModule {
}
