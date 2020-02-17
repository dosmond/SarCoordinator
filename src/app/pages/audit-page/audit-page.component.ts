import { ActivatedRoute } from '@angular/router';
import { AuditPageService } from './audit-page.service';
import { AuthProcessService } from 'src/app/pages/authentication/auth-service';
import { Component, OnInit } from '@angular/core';
import { AuditPageWidgetOptions } from './audit-page-widget/audit-page-widget-options';
import { Observable, of } from 'rxjs';
import { DatePipe } from '@angular/common'
import { ICaseId } from 'src/app/models/ICaseId';

@Component({
  selector: 'audit-page',
  templateUrl: './audit-page.component.html',
  styleUrls: ['./audit-page.component.scss']
})
export class AuditPageComponent implements OnInit {

  threshold: number;
  totalCases : number;
  caseIds;
  volunteerDataObservable$ : Observable<any>;
  auditPageOptions: AuditPageWidgetOptions;
  auditPageTableOptions = {
    pageSize: 10,
    columns: [
      { name: 'Volunteer', property: 'name', visible: true, isModelProperty: true },
      { name: 'Role', property: 'roles', visible: true, isModelProperty: true },
      { name: 'Badge Number', property: 'badgeNumber', visible: true, isModelProperty: true },
      { name: "Case Participation", property: 'casesLength', visible: true, isModelProperty: true},
      { name: "%", property: 'percent', visible: true, isModelProperty: true},
      { name: 'Phone Number', property: 'phoneNumber', visible: false, isModelProperty: true },
    ]
  };

  constructor(private afa: AuthProcessService,
              private auditService : AuditPageService,
              private routeParse: ActivatedRoute,
              private datePipe : DatePipe) { }

  ngOnInit() {
    this.refreshVolunteers();
  }

  refreshVolunteers(){
    this.threshold = 20;
    this.auditPageOptions = {
      title: "Volunteers",
      subTitle: "List of all volunteers",
      totalCases: `Total Cases: -`,
      threshold: `Threshold: ${this.threshold}`
    }

    this.afa.getIdToken().then(token => {
      let date : string = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
      // Get total case count from current date back.
      this.auditService.getCaseCount(token,{startDate: null, endDate: date}).subscribe(res => {
        let data : ICaseId[] = (res as ICaseId[])
        this.caseIds = data
        this.totalCases = data.length
        this.auditPageOptions = {
          title: "Volunteers",
          subTitle: "List of all volunteers",
          totalCases: `Total Cases: ${this.totalCases}`,
          threshold: `Threshold: ${this.threshold}`
        }
      })

      this.auditService.getVolunteers(token).subscribe(res => {
        let data = {volunteers: res as any[]}
        data.volunteers.forEach(volunteer => {
          let count = 0;
          volunteer.cases.forEach(caseId => {
            this.caseIds.forEach(id => {
              if(caseId == id.id){
                count++;
              }
            });
          });

          if(this.totalCases != 0){
            volunteer.casesLength = count;
            volunteer.percent = (count / this.totalCases) * 100;
          }else {
            volunteer.casesLength = count;
            volunteer.percent = 100;
          }
        })

        this.volunteerDataObservable$ = of(data.volunteers);
      })
    })


  }

  refreshWithDates(dates){
    if(dates.threshold > 100)
      dates.threshold = 100
    if(dates.threshold < 0)
      dates.threshold = 0
    this.threshold = dates.threshold
    this.auditPageOptions = {
      title: "Volunteers",
      subTitle: "List of all volunteers",
      totalCases: `Total Cases: -`,
      threshold: `Threshold: ${this.threshold}`
    }

    this.afa.getIdToken().then(token => {

      this.auditService.getCaseCount(token, dates).subscribe(res => {
        let data : ICaseId[] = (res as ICaseId[])
        this.caseIds = data
        this.totalCases = data.length
        this.auditPageOptions = {
          title: "Volunteers",
          subTitle: "List of all volunteers",
          totalCases: `Total Cases: ${data.length}`,
          threshold: `Threshold: ${this.threshold}`
        }
      })

      this.auditService.getVolunteers(token, dates).subscribe(res => {
        let data = {volunteers: res as any[]}

        data.volunteers.forEach(volunteer => {
          let count = 0;
          volunteer.cases.forEach(caseId => {
            this.caseIds.forEach(id => {
              if(caseId == id.id){
                count++;
              }
            });
          });

          if(this.totalCases != 0){
            volunteer.casesLength = count;
            volunteer.percent = (count / this.totalCases) * 100;
          }else {
            volunteer.casesLength = count;
            volunteer.percent = 100;
          }
        })

        this.volunteerDataObservable$ = of(data.volunteers);
      })
    })

    
  }

  private _gap = 16;
  gap = `${this._gap}px`;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }
}
