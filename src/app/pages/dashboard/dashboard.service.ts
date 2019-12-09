import { ThemeConfig } from './../../../@fury/services/theme.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { recentSalesTableDemoData } from '../demo-data/widget-demo-data';

/**
 * @class DashboardService
 * This is just a pages service for populating the charts on the dashboard.
 * You will have to implement a similiar service for the data to be populated.
 * Examples are provided below :)
 */

@Injectable()
export class DashboardService {

  url = environment.backend;

  constructor(private http: HttpClient) {
  }

  getRecentSalesTableData() {
    // Simulating request from local data
    return this.http.get("https://us-central1-sar-solutions.cloudfunctions.net/getCasesWeb");
    //return of(recentSalesTableDemoData);
  }

  getCaseData(caseId: string){
    return this.http.get(`${this.url}/getCaseData?caseId=${caseId}`);
  }
}