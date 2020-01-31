import { PdfGenComponent } from './../pdf-gen/pdf-gen.component';
import { AuthProcessService } from './../authentication/auth-service';
import { ICases } from 'src/app/models/ICases';
import { ICase } from 'src/app/models/ICase';
import { ICaseIds } from 'src/app/models/ICaseIds';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, ReplaySubject } from 'rxjs';
import { RecentSalesWidgetOptions } from './widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { DashboardService } from './dashboard.service';
import { MatDialog } from '@angular/material/dialog'
import { VolunteerFormDialogComponent } from '../forms/volunteer-form/volunteer-form.component';

@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private static isInitialLoad = true;
  data : any;

  caseOptions: RecentSalesWidgetOptions = {
    title: 'Cases',
    subTitle: 'A view of all cases'
  };
  caseTableOptions = {
    clickable: true,
    pageSize: 5,
    columns: [
      { name: 'Case Id', property: 'caseId', visible: false, isModelProperty: true},
      { name: 'Missing Person(s)', property: 'missingPersonName', visible: true, isModelProperty: true },
      { name: 'Date', property: 'date', visible: true, isModelProperty: true },
    ]
  };
  caseDataObservable$ : Observable<any>;

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
      { name: 'Actions', property: 'actions', visible: true, isModelProperty: true },
    ]
  };
  volunteerDataObservable$ : Observable<any>;

  /**
   * Needed for the Layout
   */
  private _gap = 16;
  gap = `${this._gap}px`;

  constructor(public dialog: MatDialog,
              private dashboardService: DashboardService,
              private router: Router,
              private aps : AuthProcessService) {
    /**
     * Edge wrong drawing fix
     * Navigate anywhere and on Promise right back
     */
    if (/Edge/.test(navigator.userAgent)) {
      if (DashboardComponent.isInitialLoad) {
        this.router.navigate(['/apps/chat']).then(() => {
          this.router.navigate(['/']);
        });

        DashboardComponent.isInitialLoad = false;
      }
    }

  }

  col(colAmount: number) {
    return `1 1 calc(${100 / colAmount}% - ${this._gap - (this._gap / colAmount)}px)`;
  }

  ngOnInit() {
    this.caseDataObservable$ = of([{}]);
    this.dashboardService.getRecentSalesTableData().subscribe((res) => {
      this.data = (res as ICaseIds);
      let tokenData : Promise<string> = this.aps.getIdToken();
      let token = "";
      let cases : ICases = {cases : []};
      tokenData.then(id => {
        token = id;
        this.data.caseIds.forEach(element => {
          this.dashboardService.getCaseData(element.caseId, token).subscribe(res => {

            let cdata = (res as ICase);
            cdata.caseId = element.caseId
            cdata.date = new Date(cdata.date).toLocaleString();
            cases.cases.push(cdata);

            if(cases.cases.length == this.data.caseIds.length)
              this.caseDataObservable$ = of(cases.cases);
          })
        });
      })
    });

    this.dashboardService.getVolunteerTableData().subscribe(res => {
      this.volunteerDataObservable$ = of(res[0].volunteers);
    })
  }

  openVolunteerDialog(): void {
    const dialogRef = this.dialog.open(VolunteerFormDialogComponent, {
      width: '30vw'});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
