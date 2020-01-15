import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdfGenComponent } from './pdf-gen.component';
import { ReactiveFormsModule } from '@angular/forms'


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  declarations: [PdfGenComponent],
  entryComponents: [PdfGenComponent]
})
export class ReportFormModule {
}
