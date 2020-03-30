import { element } from 'protractor';
import * as moment from 'moment';
import { ICaseIds } from './../../models/ICaseIds';
import { AuthProcessService } from './../authentication/auth-service';
import { ICases } from 'src/app/models/ICases';
import { ICase } from 'src/app/models/ICase';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RecentSalesWidgetOptions } from './widgets/recent-sales-widget/recent-sales-widget-options.interface';
import { DashboardService } from './dashboard.service';
import { MatDialog } from '@angular/material/dialog'
import { ChartData } from 'chart.js';
import { DonutChartWidgetOptions } from './widgets/donut-chart-widget/donut-chart-widget-options.interface';
import { BarChartWidgetOptions } from './widgets/bar-chart-widget/bar-chart-widget-options.interface';

@Component({
  selector: 'fury-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private static isInitialLoad = true;
  totalCases: number;
  caseloading: boolean;
  volunteerloading: boolean;
  data : ICase[];
  caseOptions: RecentSalesWidgetOptions = {
    title: 'Cases',
    subTitle: 'A view of all cases'
  };
  caseTableOptions = {
    clickable: true,
    pageSize: 5,
    columns: [
      { name: 'Case Id', property: 'id', visible: false, isModelProperty: true},
      { name: 'Missing Person(s)', property: 'missingPersonName', visible: true, isModelProperty: true },
      { name: 'Date', property: 'date', visible: true, isModelProperty: true },
      { name: "Status", property: 'caseStatus', visible: true, isModelProperty: true}
    ]
  };
  caseDataObservable$ : Observable<any>;

  donutData$: Observable<ChartData>;
  donutOptions: DonutChartWidgetOptions = {
    title: 'Case Status',
    subTitle: 'Open vs. Closed'
  };

  barMonthData = {'January': 0, 'February': 0, 'March': 0, 'April': 0, 'May': 0, 'June': 0, 'July': 0, 'August': 0, 'September': 0, 'October': 0, 'November': 0, 'December': 0, }
  barData$: Observable<ChartData>;
  barOptions: BarChartWidgetOptions = {
    title: 'Total Cases',
    gain: 16.3,
    subTitle: 'By Month',
    background: '#3F51B5',
    color: '#FFFFFF'
  };
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
    this.refreshCases();
  }

  refreshCases() {
    this.caseloading = true;
    let openCount = 0;
    let closedCount = 0;

    let cases : ICases = {cases : []};
    let countyId = localStorage.getItem('currentCounty');
    this.aps.getIdToken().then(token => {
      this.dashboardService.getCases(countyId, token).subscribe((res) => {
        this.data = (res as ICase[]);
        this.totalCases = this.data.length
        this.data.forEach(element => {
          if(element.isOpen){
            element.caseStatus = "Open"
            openCount = openCount + 1
          }
          else {
            element.caseStatus = "Closed"
            closedCount = closedCount + 1
          }

          var d = new Date(0);
          d.setUTCSeconds(element.date);
          element.date = d.toDateString();
          let month = moment(d).format("MMMM")
          this.barMonthData[month] = this.barMonthData[month] + 1
          cases.cases.push(element);
  
          if(cases.cases.length == this.data.length){
            this.caseDataObservable$ = of(cases.cases);
            this.createDonutData(openCount, closedCount)
            this.createBarData()
          }
        })


      })
    });
  }

  createDonutData(openCount, closedCount){
    let data = [
      {
        'label': 'Open',
        'value': openCount
      },
      {
        'label': 'Closed',
        'value': closedCount
      },
    ];
    this.donutData$ = this.dashboardService.getDonutData(data)
  }

  createBarData(){
    let data = []
    let vals = Object.keys(this.barMonthData)
    
    vals.forEach(month => {
      let subdata = {
        'label': month,
        'value': this.barMonthData[month]
      }
      data.push(subdata)
    })

    this.barData$ = this.dashboardService.getBarData(data)
  }

}
