import { AuthProcessService } from './../authentication/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { volunteerDummyData } from '../demo-data/widget-demo-data';


@Injectable()
export class VolunteerService {

  url = "https://us-central1-sar-solutions.cloudfunctions.net";
  


  constructor(private http: HttpClient,
              private aps: AuthProcessService) {

  }

  // Currently using dummy data
  getVolunteerTableData(token : string) {
    return of(volunteerDummyData);
  }

  getVolunteers(countyId:string ,token: string) {
    const url = `${this.url}/getVolunteers?countyId=${countyId}`
    return this.http.get(url, {headers: {'Authorization': token}})
  }

}