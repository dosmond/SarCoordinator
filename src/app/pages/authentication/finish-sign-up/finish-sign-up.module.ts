import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../../@fury/shared/material-components.module';
import { FinishSignUpComponent } from './finish-sign-up.component';
import { FinishSignUpRoutingModule } from './finish-sign-up-routing.module'

@NgModule({
  imports: [
    CommonModule,
    FinishSignUpRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [FinishSignUpComponent]
})
export class FinishSignUpModule {
}