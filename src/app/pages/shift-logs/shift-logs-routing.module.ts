import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShiftLogsComponent } from './shift-logs.component';

const routes: Routes = [
  {
    path: '',
    component: ShiftLogsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftLogsRoutingModule {
}
