import { AuthProcessService } from './../authentication/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { volunteerDummyData, top5CategoriesDemoData } from '../demo-data/widget-demo-data';
import { ChartData } from 'chart.js';
import { map } from 'rxjs/operators';

/**
 * @class DashboardService
 * This is just a pages service for populating the charts on the dashboard.
 * You will have to implement a similiar service for the data to be populated.
 * Examples are provided below :)
 */


@Injectable()
export class DashboardService {

  url = "https://us-central1-sar-solutions.cloudfunctions.net";
  


  constructor(private http: HttpClient,
              private aps: AuthProcessService) {

  }

  getRecentSalesTableData(token) {
    return this.http.get(`${this.url}/getCases`, {headers: {'Authorization': token}});
  }

  // Currently using dummy data
  getVolunteerTableData(token : string) {
    return of(volunteerDummyData);
  }

  getCaseData(caseId: string, token : string){
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };
    
    return this.http.get(`${this.url}/getCaseData?caseId=${caseId}`, httpOptions);
  }

  getVolunteers(token: string) {
    const url = `${this.url}/getVolunteers`
    return this.http.get(url, {headers: {'Authorization': token}})
  }

  postCase(token: string, userId: string, form){
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };
    return this.http.post(`${this.url}/postCase?userId=${userId}`,form, httpOptions);
  }

  getDonutData(data) {
    return of(data).pipe(
      map(values => this.toDonutData(values))
    );
  }

  toDonutData(chartData: { label: string, value: number }[]) {
    return {
      labels: chartData.map(data => data.label),
      datasets: [
        {
          data: chartData.map(data => data.value),
          backgroundColor: ['#2196F3', '#009688', '#4CAF50', '#607D8B', '#E91E63']
        }
      ]
    } as ChartData;
  }

  getBarData(data) {
    return of(data).pipe(
      map(values => this.toBarChartData(values))
    );
  }

  /**
   * Converting Data from Server to Chart compatible format
   * @returns {Chart.ChartData}
   */
  toBarChartData(chartData: { label: string, value: number }[]) {
    return {
      labels: chartData.map(data => data.label),
      datasets: [
        {
          data: chartData.map(data => data.value),
          backgroundColor: ['#2196F3', '#009688', '#4CAF50', '#607D8B', '#E91E63','#2196F3', '#009688', '#4CAF50', '#607D8B', '#E91E63', '#2196F3', '#009688'],
        }
      ]
    } as ChartData;
  }
}