import { MaterialModule } from 'src/@fury/shared/material-components.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { LandingLayoutComponent } from './layout.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollSpyModule } from 'ngx-scrollspy';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LandingLayoutComponent],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    NgbModule,
    MaterialModule,
    ScrollSpyModule.forRoot(),
    ScrollToModule.forRoot()
  ]
})
export class LandingLayoutModule { }
