import { ActivatedRoute } from '@angular/router';
import { AuditPageService } from './audit-page.service';
import { AuthProcessService } from 'src/app/pages/authentication/auth-service';
import { Component, OnInit } from '@angular/core';
import { AuditPageWidgetOptions } from './audit-page-widget/audit-page-widget-options';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'audit-page',
  templateUrl: './audit-page.component.html',
  styleUrls: ['./audit-page.component.scss']
})
export class AuditPageComponent implements OnInit {

  volunteerDataObservable$ : Observable<any>;
  auditPageOptions: AuditPageWidgetOptions;
  auditPageTableOptions = {
    pageSize: 5,
    columns: [
      { name: 'Volunteer', property: 'name', visible: true, isModelProperty: true },
      { name: 'Role', property: 'roles', visible: true, isModelProperty: true },
      { name: 'Badge Number', property: 'badgeNumber', visible: true, isModelProperty: true },
      { name: 'Phone Number', property: 'phoneNumber', visible: false, isModelProperty: true },
    ]
  };

  constructor(private afa: AuthProcessService,
              private auditService : AuditPageService,
              private routeParse: ActivatedRoute) { }

  ngOnInit() {
    this.refreshVolunteers();
  }

  refreshVolunteers(){
    this.afa.getIdToken().then(token => {
      this.auditService.getVolunteers(token).subscribe(res => {
        let data = {volunteers: res}
        console.log(data)
        this.volunteerDataObservable$ = of(data.volunteers);
      })
    })

    this.auditPageOptions = {
      title: "Volunteers",
      subTitle: "List of all volunteers"
    }
  }

  private _gap = 16;
  gap = `${this._gap}px`;

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }
}
