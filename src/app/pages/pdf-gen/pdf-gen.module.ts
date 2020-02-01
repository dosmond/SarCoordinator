import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PdfGenComponent } from './pdf-gen.component';
import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { PdfService } from './pdf-gen.service';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PdfViewerModule,
    MaterialModule,
    
  ],
  declarations: [PdfGenComponent],
  entryComponents: [PdfGenComponent],
  providers: [PdfService]
})
export class ReportFormModule {}
