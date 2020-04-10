import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbsModule } from '../../../../@sar/shared/breadcrumbs/breadcrumbs.module';
import { MaterialModule } from '../../../../@sar/shared/material-components.module';
import { SarSharedModule } from '../../../../@sar/sar-shared.module';
import { PhotoGridComponent } from './photo-grid.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { PhotoGridService } from './photo-grid.service';

@NgModule({
  imports: [
    CommonModule,
    SarSharedModule,
    MaterialModule,

    // Core
    BreadcrumbsModule,
    NgxGalleryModule,
  ],
  declarations: [PhotoGridComponent],
  exports: [PhotoGridComponent],
  providers: [PhotoGridService]
})
export class PhotoGridModule {
}
