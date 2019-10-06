import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {

  baseUrl = 'https://us-central1-sar-solutions.cloudfunctions.net/';

  constructor(private http: HttpClient) { }

  getPaths(){
    return this.http.get(this.baseUrl + 'getPaths?caseId=1234');
  }
}
