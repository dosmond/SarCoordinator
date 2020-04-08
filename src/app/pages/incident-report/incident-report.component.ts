import { Component, OnInit } from '@angular/core';
import {NgxPrintModule} from 'ngx-print';
import { IncidentReportService } from './incident-report.service';
import { Observable } from 'rxjs';
import { IShift } from 'src/app/models/IShift';
import { AuthProcessService } from '../authentication/auth-service';
import { ICase } from 'src/app/models/ICase';
import { MatSelectChange } from '@angular/material';
import { fadeInUpStaggerAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';

@Component({
  selector: 'fury-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.scss'],
  animations: [fadeInUpStaggerAnimation, fadeInRightAnimation]
})
export class IncidentReportComponent implements OnInit {
  caseDescription: string;
  caseId:string;
  caseNumber: string;
  caseNumberFormatted: string;
  cases: Observable<ICase>;
  date: string;
  dateMillis: number;
  days: number; //number of days case has been open for.
  daysArr:number[];
  missingPerson: string;
  operationalPeriod: number; //currently selected operational period
  reporterName: string;
  selected: number;
  shifts: Observable<any>;
  timeDispatched: string;
  totalCombinedMiles: number;
  totalCountyMiles: number;
  totalCountyVehicles: number;
  totalPersonalMiles: number;
  totalPersonalVehicles: number;
  totalVolunteerHours: number;
  vehicles: [];

  
  constructor(private reportService: IncidentReportService,
    private aps : AuthProcessService) {}

  ngOnInit() {
    
    // this.aps.getIdToken().then(token => {
    //   this.shifts = this.reportService.getShiftReports(this.caseId, token, 1);
    // });

    this.aps.getIdToken().then(token => { //TODO It'd be better to check the exp date, then get a new token only if needed.
      let countyId = localStorage.getItem("currentCounty");
      this.cases = this.reportService.getCases(countyId, token);
    });
    
  }

  caseSelected(event: MatSelectChange){
    this.resetVolunteersTable();
    this.caseId = event.value;
    this.selected = null;
    this.shifts = null;
    this.aps.getIdToken().then(token => { 
      this.reportService.getCaseData(this.caseId,token).subscribe((res: ICase)=> {
        this.missingPerson = res.missingPersonName;
        this.caseDescription = res.description;
        this.date = new Date(res.date * 1000).toLocaleDateString(); //js Date takes milliseconds, we store seconds.
        this.dateMillis = res.date*1000;
        this.reporterName = res.reporterName;
        this.days = res.days;
        this.daysArr = new Array(this.days);
        this.caseNumber =  res.caseNumber;
        this.timeDispatched = new Date(res.date * 1000).toLocaleTimeString();
      });
    });
    
  }

  /**
   * formatting specific to wasatch county
   */
  getFormattedCaseNumber(op: number):string{
    let date: Date = new Date(this.dateMillis);
    let month: number = date.getMonth() + 1;
    let monthString:string = month < 10? '0'+ month: month.toString();
    return date.getFullYear() % 100 + monthString + '-' + this.caseNumber + '-' + op;
  }

  daySelected(event: MatSelectChange){
    this.operationalPeriod = event.value;
    this.caseNumberFormatted= this.getFormattedCaseNumber(this.operationalPeriod);
    this.aps.getIdToken().then(token => { 
      this.shifts = this.reportService.getShiftReports(this.caseId, token, this.operationalPeriod);
      this.updateTotals();
    });
    
  }

  updateTotals(){
    this.shifts.subscribe(data => {
      this.resetVolunteersTable();
      data.forEach((shift:IShift) => {
        this.totalVolunteerHours += shift.hours;
        shift.vehicles.forEach((vehicle:any) =>{
          if(vehicle.isCountyVehicle){
            this.totalCountyMiles += Number(vehicle.milesTraveled);
            this.totalCountyVehicles ++;
          } else {
            this.totalPersonalMiles += Number(vehicle.milesTraveled);
            this.totalPersonalVehicles ++;
          }
        });
        
      });
      this.totalCombinedMiles = this.totalPersonalMiles + this.totalCountyMiles;
    });
  }

  resetVolunteersTable(){
    this.totalCountyVehicles = 0;
      this.totalCountyMiles = 0;
      this.totalPersonalVehicles = 0;
      this.totalPersonalMiles = 0;
      this.totalVolunteerHours = 0;
      this.totalCombinedMiles = 0;
  }
}
