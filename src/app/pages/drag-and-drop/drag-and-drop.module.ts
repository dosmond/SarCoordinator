import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BreadcrumbsModule } from '../../../@sar/shared/breadcrumbs/breadcrumbs.module';
import { sarCardModule } from '../../../@sar/shared/card/card.module';
import { MaterialModule } from '../../../@sar/shared/material-components.module';
import { ScrollbarModule } from '../../../@sar/shared/scrollbar/scrollbar.module';
import { DragAndDropRoutingModule } from './drag-and-drop-routing.module';
import { DragAndDropComponent } from './drag-and-drop.component';
import { SarSharedModule } from '../../../@sar/sar-shared.module';

@NgModule({
  imports: [
    CommonModule,
    DragAndDropRoutingModule,
    SarSharedModule,
    MaterialModule,
    ReactiveFormsModule,
    ScrollbarModule,
    DragDropModule,
    BreadcrumbsModule,
    sarCardModule
  ],
  declarations: [DragAndDropComponent]
})
export class DragAndDropModule {
}
