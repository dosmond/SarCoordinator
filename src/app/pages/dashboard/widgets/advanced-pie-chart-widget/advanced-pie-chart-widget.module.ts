import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { sarCardModule } from '../../../../../@sar/shared/card/card.module';
import { LoadingOverlayModule } from '../../../../../@sar/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sar/shared/material-components.module';
import { ScrollbarModule } from '../../../../../@sar/shared/scrollbar/scrollbar.module';
import { AdvancedPieChartWidgetComponent } from './advanced-pie-chart-widget.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    sarCardModule,
    LoadingOverlayModule,
    ScrollbarModule
  ],
  declarations: [AdvancedPieChartWidgetComponent],
  exports: [AdvancedPieChartWidgetComponent]
})
export class AdvancedPieChartWidgetModule {
}
