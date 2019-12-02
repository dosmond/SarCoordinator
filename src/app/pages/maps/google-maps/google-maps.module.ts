import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsRoutingModule } from './google-maps-routing.module';
import { GoogleMapsComponent } from './google-maps.component';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsRoutingModule,
  ],
  declarations: [GoogleMapsComponent],
  exports:[GoogleMapsComponent]
})
export class GoogleMapsModule {
}
