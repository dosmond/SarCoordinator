import { Component, OnInit } from '@angular/core';
import {NgxPrintModule} from 'ngx-print';
import { IncidentReportService } from './incident-report.service';
import { Observable } from 'rxjs';
import { IShift } from 'src/app/models/IShift';
import { AuthProcessService } from '../authentication/auth-service';
import { ICase } from 'src/app/models/ICase';
import { MatSelectChange } from '@angular/material';
import { CaseDashboardService } from '../dashboard/case-dashboard/case-dashboard.service';

@Component({
  selector: 'fury-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.scss']
})
export class IncidentReportComponent implements OnInit {
  shifts: Observable<IShift>;
  cases: Observable<ICase>;
  caseNum: string;
  caseId:string;
  operationalPeriod: number; //currently selected operational period
  days: number; //number of days case has been open for.
  missingPerson: string;
  reporterName: string;
  caseDescription: string;
  date: string;
  vehicles: [];
  daysArr:number[]
  selected: number

  
  constructor(private reportService: IncidentReportService,
    private aps : AuthProcessService) {
      this.caseNum = '####-####'; //TODO get this from dropdown or from route
     }

  ngOnInit() {
    
    // this.aps.getIdToken().then(token => {
    //   this.shifts = this.reportService.getShiftReports(this.caseId, token, 1);
    // });

    this.aps.getIdToken().then(token => { //TODO It'd be better to check the exp date, then get a new token only if needed.
      this.cases = this.reportService.getCases(token);
    });
    
  }

  caseSelected(event: MatSelectChange){
    this.caseId = event.value;
    this.selected = null;
    this.shifts = null;
    this.aps.getIdToken().then(token => { 
      this.reportService.getCaseData(this.caseId,token).subscribe((res: ICase)=> {
        this.missingPerson = res.missingPersonName;
        this.caseDescription = res.description;
        this.date = new Date(res.date * 1000).toLocaleDateString(); //js Date takes milliseconds, we store seconds.
        this.reporterName = res.reporterName;
        this.days = res.days;
        this.daysArr = new Array(this.days);
      });
    });
    
  }

  daySelected(event: MatSelectChange){
    this.operationalPeriod = event.value;
    this.aps.getIdToken().then(token => { 
      this.shifts = this.reportService.getShiftReports(this.caseId, token, this.operationalPeriod);
    });
    
  }




}
