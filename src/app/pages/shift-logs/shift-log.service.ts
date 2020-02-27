import { AuthProcessService } from '../authentication/auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ShiftLogService {

  url = "https://us-central1-sar-solutions.cloudfunctions.net";
  

  constructor(private http: HttpClient,
              private aps: AuthProcessService) {

  }

  getShifts(token: string, caseId: string, userId: string) {
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };

    return this.http.get(`${this.url}/getShifts?caseId=${caseId}&userId=${userId}`, httpOptions);
  }

  putHours(token: string, shiftUpdates: any[]) {
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };

    return this.http.put(`${this.url}/putHours`, shiftUpdates, httpOptions);
  }

}