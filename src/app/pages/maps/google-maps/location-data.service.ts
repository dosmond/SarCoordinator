import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Shift {
  caseId:string,
  endTime,
  startTime,
  totalTime: number,
  user: string,
  Path: [Geolocation]
}

@Injectable({
  providedIn: 'root'
})
export class LocationDataService {

  baseUrl = 'https://us-central1-sar-solutions.cloudfunctions.net/';

  constructor(private http: HttpClient, private firestore: AngularFirestore) { }

  getPaths(caseId:string, token:string){
    let httpOptions = {
      headers : new HttpHeaders().set("Authorization", token)
    };
    
    return this.http.get(`${this.baseUrl}getPaths?caseId=${caseId}`, httpOptions);
  }
}
