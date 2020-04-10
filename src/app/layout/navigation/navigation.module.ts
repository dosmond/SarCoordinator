import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { SarSharedModule } from '../../../@sar/sar-shared.module';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';

@NgModule({
  imports: [
    CommonModule,
    SarSharedModule
  ],
  declarations: [NavigationComponent, NavigationItemComponent],
  exports: [NavigationComponent]
})
export class NavigationModule {
}
