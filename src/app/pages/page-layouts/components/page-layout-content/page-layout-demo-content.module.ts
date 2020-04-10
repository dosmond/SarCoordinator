import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutDemoContentComponent } from './page-layout-demo-content.component';
import { SarSharedModule } from '../../../../../@sar/sar-shared.module';

@NgModule({
  declarations: [PageLayoutDemoContentComponent],
  imports: [
    CommonModule,
    SarSharedModule
  ],
  exports: [PageLayoutDemoContentComponent]
})
export class PageLayoutDemoContentModule {
}
