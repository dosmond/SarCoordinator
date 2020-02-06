import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FuryCardModule } from '../../../../../@fury/shared/card/card.module';
import { ListModule } from '../../../../../@fury/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../../@fury/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@fury/shared/material-components.module';
import { AddVolunteersWidgetComponent } from './add-volunteers-widget.component';
import { AddVolunteersWidgetTableComponent } from './add-volunteers-widget-table/add-volunteers-widget-table.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    FuryCardModule,
    ListModule
  ],
  declarations: [AddVolunteersWidgetComponent, AddVolunteersWidgetTableComponent],
  exports: [AddVolunteersWidgetComponent]
})
export class AddVolunteersWidgetModule {
}
