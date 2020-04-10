import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../@sar/shared/material-components.module';
import { VolunteerFormDialogComponent } from './volunteer-form.component';
import { ReactiveFormsModule } from '@angular/forms'
import { SarSharedModule } from '../../../../@sar/sar-shared.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SarSharedModule,
    ReactiveFormsModule
  ],
  declarations: [VolunteerFormDialogComponent],
  entryComponents: [VolunteerFormDialogComponent]
})
export class VolunteerFormModule {
}
