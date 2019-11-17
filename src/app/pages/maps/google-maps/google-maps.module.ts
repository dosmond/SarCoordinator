import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GoogleMapsRoutingModule } from './google-maps-routing.module';
import { GoogleMapsComponent } from './google-maps.component';

@NgModule({
  imports: [
    CommonModule,
    GoogleMapsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBGHIUzjo5snwJIpHLMH_PEgNd5O7ltNTg'
    })
  ],
  declarations: [GoogleMapsComponent]
})
export class GoogleMapsModule {
}
