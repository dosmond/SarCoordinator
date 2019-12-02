import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  recentSalesChartDemoLabels,
  recentSalesChartDemoValues,
  recentSalesTableDemoData,

} from '../../demo-data/widget-demo-data';

/**
 * @class DashboardService
 * This is just a pages service for populating the charts on the dashboard.
 * You will have to implement a similiar service for the data to be populated.
 * Examples are provided below :)
 */

@Injectable()
export class CaseDashboardService {

  url = environment.backend;

  constructor(private http: HttpClient) {
  }

  getRecentSalesTableData() {
    // Simulating request from local data
    return of(recentSalesTableDemoData);
  }

  getCaseData(caseId: string){
    return this.http.get(`${this.url}/getCaseData?caseId=${caseId}`);
  }
}