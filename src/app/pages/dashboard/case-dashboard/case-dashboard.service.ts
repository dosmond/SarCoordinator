import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartData } from 'chart.js';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
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

  getCaseData(caseId: string, token: string){
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };
    return this.http.get(`${this.url}/getCaseData?caseId=${caseId}`, httpOptions);
  }

  deleteVolunteerFromRow(token: string, caseId: string, userId: string){
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };
    return this.http.delete(`${this.url}/deleteVolunteerFromCase?caseId=${caseId}&userId=${userId}`, httpOptions);
  }
}
