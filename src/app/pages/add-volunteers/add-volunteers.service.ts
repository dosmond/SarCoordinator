import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class AddVolunteersService {

    url = environment.backend

    constructor(private http: HttpClient){}

    putVolunteers(token: string, caseId: string, volunteerIds: string[]){
        let httpOptions = {
            headers : new HttpHeaders().set("Authorization", token)
          };

        let volunteers = {volunteers: volunteerIds};
        return this.http.put(`${this.url}/putVolunteers?caseId=${caseId}`, volunteers, httpOptions);
    }
}