import { VolunteerService } from './volunteer-page.service';
import { AuthProcessService } from './../authentication/auth-service';
import { Component, OnInit } from '@angular/core';
import { RecentSalesWidgetOptions } from '../dashboard/widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { Observable, of } from 'rxjs';
import { fadeInUpStaggerAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';

@Component({
  selector: 'volunteer-page',
  templateUrl: './volunteer-page.component.html',
  styleUrls: ['./volunteer-page.component.scss'],
  animations: [fadeInUpStaggerAnimation, fadeInRightAnimation]
})
export class VolunteerPageComponent implements OnInit {

  volunteerloading: boolean;
  volunteerOptions: RecentSalesWidgetOptions = {
    title: 'Volunteers',
    subTitle: 'All registered volunteers'
  };
  volunteerTableOptions = {
    clickable: false,
    pageSize: 5,
    columns: [
      { name: 'Volunteer', property: 'name', visible: true, isModelProperty: true },
      { name: 'Role', property: 'roles', visible: true, isModelProperty: true },
      { name: 'Badge Number', property: 'badgeNumber', visible: true, isModelProperty: true },
    ]
  };
  volunteerDataObservable$ : Observable<any>;
  
  
  constructor(private aps: AuthProcessService,
              private volunteerService: VolunteerService) { }

  ngOnInit() {
    this.refreshVolunteers()
  }

  refreshVolunteers(){
    this.volunteerloading = true;
    this.aps.getIdToken().then(token => {
      this.volunteerService.getVolunteers(token).subscribe(res => {
        let data = {volunteers: res}
        this.volunteerDataObservable$ = of(data.volunteers);
        this.volunteerloading = false;
      })
    })
  }

}
