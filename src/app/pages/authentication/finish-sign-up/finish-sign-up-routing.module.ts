import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinishSignUpComponent } from './finish-sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: FinishSignUpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinishSignUpRoutingModule {
}