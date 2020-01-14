import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { volunteerDummyData } from '../demo-data/widget-demo-data';

/**
 * @class DashboardService
 * This is just a pages service for populating the charts on the dashboard.
 * You will have to implement a similiar service for the data to be populated.
 * Examples are provided below :)
 */

@Injectable()
export class DashboardService {

  url = environment.backend;

  constructor(private http: HttpClient) {
  }

  getRecentSalesTableData() {
    return this.http.get("https://us-central1-sar-solutions.cloudfunctions.net/getCasesWeb");

  }

  // Currently using dummy data
  getVolunteerTableData() {
    return of(volunteerDummyData);
  }

  getCaseData(caseId: string){
    return this.http.get(`${this.url}/getCaseData?caseId=${caseId}`);
  }

  getVolunteers(token: string) {
    const url = `${this.url}/getVolunteers`
    return this.http.get(url, {headers: {'id-token': 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlNWNlZDZlNDBkY2QxZWZmNDA3MDQ4ODY3YjFlZDFlNzA2Njg2YTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2FyLXNvbHV0aW9ucyIsImF1ZCI6InNhci1zb2x1dGlvbnMiLCJhdXRoX3RpbWUiOjE1Nzc0MTE4MjYsInVzZXJfaWQiOiJLd09zakVISExhU2JSQ2J6b2c3dzRlZmJtODkyIiwic3ViIjoiS3dPc2pFSEhMYVNiUkNiem9nN3c0ZWZibTg5MiIsImlhdCI6MTU3NzUxODc4MSwiZXhwIjoxNTc3NTIyMzgxLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.pgObu-4fDA-6riBqS8Z5_1ZvBQOeQwS95uKoPLuXCerxW4J-N8RYHyRPnc9bfYPVgVoWWBHX0riQldQFVCj92CrYbmSl2JjDMY2u5t1GGGNti-Vvsq7zz35KKnKRIdQmNyzmXvIHfjMm-_fYae1T_uTY-CBR7eVXJIQn054NHhJjw_VvrIv0rPdelW0n3V03_6Fs0HuK7VaRcdx7aO79Ms5tZMOnfjVgGVEKM-_NxnAiTHRczckbN5T5d0GfPMba7RnVijYQryRR9vAij6MWi2OO8C7FYCkWuq9S4NTa0IBTYirwUlE1J0i4YD4ihmD1aWGmdEXWDD-0E2-Oby8Urw',
    'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'}})
  }
}