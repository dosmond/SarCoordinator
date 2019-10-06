import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getPaths(){
    return this.http.get(this.baseUrl + 'getPaths?caseId=1234');
  }

  getPathsDirect(){
    let shift: Observable<Shift[]>= this.firestore.collection<Shift>("Shift").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Shift;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   
    return shift;
  }
}
