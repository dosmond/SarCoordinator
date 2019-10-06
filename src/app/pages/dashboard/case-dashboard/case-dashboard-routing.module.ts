import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDashboardComponent } from './case-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: CaseDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
