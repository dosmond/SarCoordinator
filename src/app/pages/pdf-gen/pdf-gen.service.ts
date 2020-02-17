import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable()
export class PdfService {

    url = environment.backend

    constructor(private http: HttpClient){}

    postReport(report, token: string, caseId: string){
        let httpOptions = {
            headers : new HttpHeaders().set("Authorization", token)
          };
        //this.http.post(`${this.url}/postReport?caseId=${caseId}`, report, httpOptions)
    }
}