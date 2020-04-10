import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { sarCardModule } from '../../../../../@sar/shared/card/card.module';
import { ListModule } from '../../../../../@sar/shared/list/list.module';
import { LoadingOverlayModule } from '../../../../../@sar/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sar/shared/material-components.module';
import { RecentSalesWidgetTableComponent } from './recent-sales-widget-table/recent-sales-widget-table.component';
import { RecentSalesWidgetComponent } from './recent-sales-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,
    sarCardModule,
    ListModule
  ],
  declarations: [RecentSalesWidgetComponent, RecentSalesWidgetTableComponent],
  exports: [RecentSalesWidgetComponent]
})
export class RecentSalesWidgetModule {
}
