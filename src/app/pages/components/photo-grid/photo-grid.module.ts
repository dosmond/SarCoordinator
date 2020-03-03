import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbsModule } from '../../../../@fury/shared/breadcrumbs/breadcrumbs.module';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FurySharedModule } from '../../../../@fury/fury-shared.module';
import { PhotoGridComponent } from './photo-grid.component';

@NgModule({
  imports: [
    CommonModule,
    FurySharedModule,
    MaterialModule,

    // Core
    BreadcrumbsModule
  ],
  declarations: [PhotoGridComponent],
  exports: [PhotoGridComponent]
})
export class PhotoGridModule {
}
