import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { ShiftLogsRoutingModule } from './shift-logs-routing.module';
import { ShiftLogsComponent } from './shift-logs.component';
import { ShiftUpdateModule } from './shift-update/shift-update.module';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { FuryCardModule } from '../../../@fury/shared/card/card.module';
import { ShiftLogService } from './shift-log.service';
import { LoadingOverlayModule } from '../../../@fury/shared/loading-overlay/loading-overlay.module';
import { VehicleListModule } from './vehicle-list/vehicle-list.module';

@NgModule({
  imports: [
    CommonModule,
    ShiftLogsRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,

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
