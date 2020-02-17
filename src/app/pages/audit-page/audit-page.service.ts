import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * @class DashboardService
 * This is just a pages service for populating the charts on the dashboard.
 * You will have to implement a similiar service for the data to be populated.
 * Examples are provided below :)
 */

@Injectable()
export class AuditPageService {

  url = environment.backend;

  constructor(private http: HttpClient) {
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

  getVolunteers(token: string, dates?) {
    if(dates === undefined)
      return this.http.get(`${this.url}/getVolunteers`, {headers: {'Authorization': token}})
    else{
      if(dates.endDate == null)
        return this.http.get(`${this.url}/getVolunteers?startDate=${dates.startDate}`, {headers: {'Authorization': token}})
      else
        return this.http.get(`${this.url}/getVolunteers?startDate=${dates.startDate}&endDate=${dates.endDate}`, {headers: {'Authorization': token}})
    }
  }

  getCaseCount(token: string, dates){
    if(dates.endDate == null)
      return this.http.get(`${this.url}/getCases?startDate=${dates.startDate}`, {headers: {'Authorization': token}})
    else if(dates.startDate != null)
      return this.http.get(`${this.url}/getCases?startDate=${dates.startDate}&endDate=${dates.endDate}`, {headers: {'Authorization': token}})
    else
      return this.http.get(`${this.url}/getCases?endDate=${dates.endDate}`, {headers: {'Authorization': token}})
  }
}
