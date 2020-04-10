import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutCardTabbedRoutingModule } from './page-layout-card-tabbed-routing.module';
import { PageLayoutCardTabbedComponent } from './page-layout-card-tabbed.component';
import { SarSharedModule } from '../../../../@sar/sar-shared.module';
import { sarCardModule } from '../../../../@sar/shared/card/card.module';
import { PageLayoutDemoContentModule } from '../components/page-layout-content/page-layout-demo-content.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [PageLayoutCardTabbedComponent],
  imports: [
    CommonModule,
    PageLayoutCardTabbedRoutingModule,
    SarSharedModule,
    sarCardModule,
    PageLayoutDemoContentModule,
    MatTabsModule
  ]
})
export class PageLayoutCardTabbedModule {
}
