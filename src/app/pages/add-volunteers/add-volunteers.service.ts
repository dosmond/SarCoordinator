import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class AddVolunteersService {

    url = environment.backend

    constructor(private http: HttpClient){}

    getVolunteers(countyID: string, token: string) {
        let httpOptions = {
            headers : new HttpHeaders().set("Authorization", token)
        };
        return this.http.get(`${this.url}/getVolunteers?countyId=${countyID}`, httpOptions)
      }

    putVolunteers(token: string, caseId: string, volunteerIds){
        let httpOptions = {
            headers : new HttpHeaders().set("Authorization", token)
          };

        return this.http.put(`${this.url}/putVolunteers?caseId=${caseId}`, volunteerIds, httpOptions);
    }
}