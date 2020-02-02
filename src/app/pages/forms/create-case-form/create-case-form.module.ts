import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { CreateCaseFormDialogComponent } from './create-case-form.component';
import { ReactiveFormsModule } from '@angular/forms'
import { FurySharedModule } from '../../../../@fury/fury-shared.module';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FurySharedModule,
    ReactiveFormsModule
  ],
  declarations: [CreateCaseFormDialogComponent],
  entryComponents: [CreateCaseFormDialogComponent]
})
export class CreateCaseFormModule {
}