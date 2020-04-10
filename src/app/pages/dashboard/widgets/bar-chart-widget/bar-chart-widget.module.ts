import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingOverlayModule } from '../../../../../@sar/shared/loading-overlay/loading-overlay.module';
import { MaterialModule } from '../../../../../@sar/shared/material-components.module';
import { BarChartWidgetComponent } from './bar-chart-widget.component';
import { sarCardModule } from '../../../../../@sar/shared/card/card.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,

    // Core
    LoadingOverlayModule,

    // Chart Widget Style
    sarCardModule
  ],
  declarations: [BarChartWidgetComponent],
  exports: [BarChartWidgetComponent]
})
export class BarChartWidgetModule {
}
