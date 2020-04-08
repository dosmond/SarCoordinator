import { GetstartComponent } from './../getstart/getstart.component';
import { MaterialModule } from './../../../../@fury/shared/material-components.module';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { ServicesComponent } from '../services/services.component';
import { AboutComponent } from '../about/about.component';
import { FeatureComponent } from '../feature/feature.component';
import { ContactComponent } from '../contact/contact.component';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { ParticlesModule } from 'angular-particle';

@NgModule({
  declarations: [
    ServicesComponent,
    AboutComponent,
    ContactComponent,
    FeatureComponent,
    HomeComponent,
    GetstartComponent
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule.forRoot(),
    HomeRoutingModule,
    ParticlesModule,
    MaterialModule
  ]
})
export class HomeModule { }

