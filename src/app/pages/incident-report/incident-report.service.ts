import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IShift } from 'src/app/models/IShift';

@Injectable()
export class IncidentReportService {
  url = environment.backend;

  constructor(private http: HttpClient) { }

  getShiftReports(caseId: string, token: string, day: number){
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };

    return this.http.get<IShift>(`${this.url}/getShiftReports?caseId=${caseId}&day=${day}`, httpOptions);
  }
}
