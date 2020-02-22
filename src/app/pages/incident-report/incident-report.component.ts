import { Component, OnInit } from '@angular/core';
import {NgxPrintModule} from 'ngx-print';
import { IncidentReportService } from './incident-report.service';
import { Observable } from 'rxjs';
import { IShift } from 'src/app/models/IShift';
import { AuthProcessService } from '../authentication/auth-service';

@Component({
  selector: 'fury-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.scss']
})
export class IncidentReportComponent implements OnInit {
  shifts: Observable<IShift>;
  caseNum: string;
  caseId:string;
  
  constructor(private reportService: IncidentReportService,
    private aps : AuthProcessService) {
      this.caseNum = '1234-1234'; //TODO get this from dropdown or from route
      this.caseId = 'VtSGSn0CFeLXD0IhZTn5'; //TODO get from route
     }

  ngOnInit() {
    
    this.aps.getIdToken().then(token => {
      this.shifts = this.reportService.getShiftReports(this.caseId, token, 1);
    });
  }



}
