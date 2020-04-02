import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [
    NotFoundRoutingModule,
    MatButtonModule,
    MatCardModule
  ],
  declarations: [NotFoundComponent],
})

export class NotFoundModule {
}