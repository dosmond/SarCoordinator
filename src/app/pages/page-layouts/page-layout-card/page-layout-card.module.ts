import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutCardRoutingModule } from './page-layout-card-routing.module';
import { PageLayoutCardComponent } from './page-layout-card.component';
import { SarSharedModule } from '../../../../@sar/sar-shared.module';
import { PageLayoutDemoContentModule } from '../components/page-layout-content/page-layout-demo-content.module';
import { sarCardModule } from '../../../../@sar/shared/card/card.module';

@NgModule({
  declarations: [PageLayoutCardComponent],
  imports: [
    CommonModule,
    PageLayoutCardRoutingModule,
    SarSharedModule,
    sarCardModule,
    PageLayoutDemoContentModule
  ]
})
export class PageLayoutCardModule {
}
