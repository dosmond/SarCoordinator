import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { ListModule } from '../../../@fury/shared/list/list.module';
import { MaterialModule } from '../../../@fury/shared/material-components.module';
import { AllInOneTableRoutingModule } from './all-in-one-table-routing.module';
import { AllInOneTableComponent } from './all-in-one-table.component';
import { ShiftUpdateModule } from './shift-update/shift-update.module';
import { FurySharedModule } from '../../../@fury/fury-shared.module';
import { FuryCardModule } from './../../../@fury/shared/card/card.module';
import { ShiftLogService } from './shift-log.service';

@NgModule({
  imports: [
    CommonModule,
    AllInOneTableRoutingModule,
    FormsModule,
    MaterialModule,
    FurySharedModule,
    FuryCardModule,

    // Core
    ListModule,
    ShiftUpdateModule,
    BreadcrumbsModule
  ],
  declarations: [AllInOneTableComponent],
  exports: [AllInOneTableComponent],
  providers: [ShiftLogService]
})
export class AllInOneTableModule {
}
