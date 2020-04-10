import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageLayoutSimpleRoutingModule } from './page-layout-simple-routing.module';
import { PageLayoutSimpleComponent } from './page-layout-simple.component';
import { SarSharedModule } from '../../../../@sar/sar-shared.module';
import { PageLayoutDemoContentModule } from '../components/page-layout-content/page-layout-demo-content.module';

@NgModule({
  declarations: [PageLayoutSimpleComponent],
  imports: [
    CommonModule,
    PageLayoutSimpleRoutingModule,
    SarSharedModule,
    PageLayoutDemoContentModule
  ]
})
export class PageLayoutSimpleModule {
}
