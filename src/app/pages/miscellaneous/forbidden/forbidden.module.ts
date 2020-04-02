import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ForbiddenComponent } from './forbidden.component';
import { ForbiddenRoutingModule } from './forbidden-routing.module';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    ForbiddenRoutingModule
  ],
  declarations: [ForbiddenComponent],
  exports: [ForbiddenComponent]
})

export class ForbiddenModule {
}