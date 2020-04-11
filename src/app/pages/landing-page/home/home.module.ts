import { GetstartComponent } from './../getstart/getstart.component';
import { MaterialModule } from './../../../../@sar/shared/material-components.module';
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
import { VideoModalComponent } from './video/video-modal/video-modal.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [
    ServicesComponent,
    AboutComponent,
    ContactComponent,
    FeatureComponent,
    HomeComponent,
    GetstartComponent,
    VideoModalComponent
  ],
  imports: [
    CommonModule,
    NgxYoutubePlayerModule.forRoot(),
    HomeRoutingModule,
    ParticlesModule,
    MaterialModule
  ],
  entryComponents: [VideoModalComponent]
})
export class HomeModule { }

