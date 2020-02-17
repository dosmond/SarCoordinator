import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData } from 'chart.js';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { RecentSalesWidgetOptions } from './recent-sales-widget-options.interface';
import { VolunteerFormDialogComponent } from 'src/app/pages/forms/volunteer-form/volunteer-form.component';
import { MatDialog } from '@angular/material';
import { CreateCaseFormDialogComponent } from 'src/app/pages/forms/create-case-form/create-case-form.component';

@Component({
  selector: 'fury-recent-sales-widget',
  templateUrl: './recent-sales-widget.component.html',
  styleUrls: ['./recent-sales-widget.component.scss']
})
export class RecentSalesWidgetComponent implements OnInit {

  @Input() tableOptions: {
    clickable : boolean;
    pageSize: number;
    columns: ListColumn[];
  };
  @Input() tableData: any[];
  @Input() chartData: ChartData;
  @Input() options: RecentSalesWidgetOptions;
  @Output() refreshCase = new EventEmitter<any>();
  @Output() refreshVolunteers = new EventEmitter<any>();

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;

  @Input() isLoading: boolean;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    if(this.tableData == null || this.tableData.length == 0)
      this.isLoading=true;
  }

  reload() {
    this.isLoading = true;

    if(this.options.title == "Cases")
      this.refreshCase.emit()
    else {
      console.log(this.options.title)
      this.refreshVolunteers.emit()
    }

      
      
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  emitRefreshCase(){
    this.refreshCase.emit()
  }

  emitRefreshVolunteers(){
    this.refreshVolunteers.emit()
  }

  openVolunteerDialog(): void {
    const dialogRef = this.dialog.open(VolunteerFormDialogComponent, {
      width: '30vw'});

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result.created == true)
        this.refreshVolunteers.emit()
    });
  }

  openCreateCaseDialog(): void{
    const dialogRef = this.dialog.open(CreateCaseFormDialogComponent, {
      width: '30vw'});

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined && result.created == true)
        this.refreshCase.emit();
    });
  }
}
;