import { AuthProcessService } from '../authentication/auth-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class ShiftLogService {

  url = "https://us-central1-sar-solutions.cloudfunctions.net";
  

  constructor(private http: HttpClient,
              private aps: AuthProcessService) {

  }

  getShifts(token: string, caseId: string, userId: string) {
    // TODO:
    const url = `${this.url}/getShifts`
    return this.http.get(url, {headers: {'Authorization': token}})
  }

}