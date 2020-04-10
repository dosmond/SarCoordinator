import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { sarCardModule } from '../../../../../@sar/shared/card/card.module';
import { ListModule } from '../../../../../@sar/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../../@sar/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sar/shared/material-components.module';
import { AddVolunteersWidgetComponent } from './add-volunteers-widget.component';
import { AddVolunteersWidgetTableComponent } from './add-volunteers-widget-table/add-volunteers-widget-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    sarCardModule,
    ListModule
  ],
  declarations: [AddVolunteersWidgetComponent, AddVolunteersWidgetTableComponent],
  exports: [AddVolunteersWidgetComponent]
})
export class AddVolunteersWidgetModule {
}
