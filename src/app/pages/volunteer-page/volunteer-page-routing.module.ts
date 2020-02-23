import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VolunteerPageComponent } from './volunteer-page.component';

const routes: Routes = [
  {
    path: '',
    component: VolunteerPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolunteerPageRoutingModule {
}