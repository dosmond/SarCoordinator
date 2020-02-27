import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData } from 'chart.js';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { CaseDataWidgetOptions } from './case-data-widget-options.interface';
import { CaseDashboardService } from '../../case-dashboard/case-dashboard.service';
import { ICase } from 'src/app/models/ICase';
import { MatDialog } from '@angular/material';
import { PdfGenComponent } from 'src/app/pages/pdf-gen/pdf-gen.component';
import { AddVolunteersComponent } from 'src/app/pages/add-volunteers/add-volunteers.component'
import { AuthProcessService } from 'src/app/pages/authentication/auth-service';
import { IncidentReportComponent } from 'src/app/pages/incident-report/incident-report.component';
import { Router } from '@angular/router';

@Component({
  selector: 'case-data-widget',
  templateUrl: './case-data-widget.component.html',
  styleUrls: ['./case-data-widget.component.scss']
})
export class CaseDataWidgetComponent implements OnInit {

  @Input() tableOptions: {
    pageSize: number;
    columns: ListColumn[]
  };
  @Input() tableData: any[];
  @Input() chartData: ChartData;
  @Input() options: CaseDataWidgetOptions;
  @Input() caseId: string;
  caseName: string;

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;
  data : ICase[];
  isLoading: boolean;

  constructor(private dashboardService : CaseDashboardService,
    private afa: AuthProcessService,
    private dialog: MatDialog,
    private router: Router) {
  }

  ngOnInit() {
    // this.caseName =  // Get everything passed first colon
  }

  ngOnChanges() {
    let temp = this.options.title;
    this.caseName = temp.substr(temp.indexOf(':')+1).trim();
  }

  async reload() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.afa.getIdToken().then(token => {
      this.dashboardService.getCaseData(this.caseId, token).subscribe(res => {
        this.data = [(res as ICase)];
        this.tableData = this.data[0].volunteers;
      });
    })
  }

  deleteRow(row){
    this.afa.getIdToken().then(token => {
      this.dashboardService.deleteVolunteerFromRow(token, this.caseId, row.userId).subscribe(res => {
        this.reload()
      })
    })
  }

  openAddVolunteersDialog(): void {
    const dialogRef = this.dialog.open(AddVolunteersComponent, {
      width: '80vw',
      height: '60vh',
      data: {
        caseId : this.caseId
      }});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openPdfDialog(): void {
    // const dialogRef = this.dialog.open(IncidentReportComponent, {
    //   width: '80vw',
    //   height: '80vh'});

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
    this.router.navigate(['./'])
  }
}
