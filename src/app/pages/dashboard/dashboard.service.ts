import { AuthProcessService } from './../authentication/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { volunteerDummyData } from '../demo-data/widget-demo-data';

/**
 * @class DashboardService
 * This is just a pages service for populating the charts on the dashboard.
 * You will have to implement a similiar service for the data to be populated.
 * Examples are provided below :)
 */


@Injectable()
export class DashboardService {

  url = "https://us-central1-sar-solutions.cloudfunctions.net/";
  


  constructor(private http: HttpClient,
              private aps: AuthProcessService) {

  }

  getRecentSalesTableData(token) {
    return this.http.get(`${this.url}/getCasesWeb`, {headers: {'Authorization': token}});
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
}