import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigPanelComponent } from './config-panel.component';
import { SarSharedModule } from '../../../@sar/sar-shared.module';
import { ConfigPanelToggleComponent } from './config-panel-toggle/config-panel-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    SarSharedModule
  ],
  declarations: [ConfigPanelComponent, ConfigPanelToggleComponent],
  exports: [ConfigPanelComponent, ConfigPanelToggleComponent]
})
export class ConfigPanelModule {
}
