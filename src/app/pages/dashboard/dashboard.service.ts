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

  url = environment.backend;

  


  constructor(private http: HttpClient,
              private aps: AuthProcessService) {

  }

  getRecentSalesTableData() {
    return this.http.get("https://us-central1-sar-solutions.cloudfunctions.net/getCasesWeb");
  }

  // Currently using dummy data
  getVolunteerTableData() {
    return of(volunteerDummyData);
  }

  getCaseData(caseId: string, token : string){
    //console.log(token);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token,
      })
    };
    
    return this.http.get(`${this.url}/getCaseData?caseId=${caseId}`);

  }
}