import { SelectionModel } from '@angular/cdk/collections';
import { Component, ElementRef, Input, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData } from 'chart.js';
import { ListColumn } from '../../../../../@sar/shared/list/list-column.model';
import { VolunteerFormDialogComponent } from 'src/app/pages/forms/volunteer-form/volunteer-form.component';
import { MatDialog } from '@angular/material';
import { CreateCaseFormDialogComponent } from 'src/app/pages/forms/create-case-form/create-case-form.component';
import { AddVolunteersWidgetOptions } from './add-volunteers-widget-options.interface';
import { IUser } from 'src/app/models/IUser';

@Component({
  selector: 'add-volunteers-widget',
  templateUrl: './add-volunteers-widget.component.html',
  styleUrls: ['./add-volunteers-widget.component.scss']
})
export class AddVolunteersWidgetComponent implements OnInit {

  @Input() tableOptions: {
    clickable : boolean;
    pageSize: number;
    columns: ListColumn[];
  };
  @Input() tableData: any[];
  @Input() chartData: ChartData;
  @Input() options: AddVolunteersWidgetOptions;
  @Output() addVolunteer = new EventEmitter<any>();
  @Output() canceller = new EventEmitter<any>();

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;
  selection = new SelectionModel<any>(true, []);
  isLoading: boolean;


  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {}

  addVolunteers(){
    let ids = [];
    this.selection.selected.forEach(row => {
      ids.push(row.userDocId)
    })
    
    this.addVolunteer.emit({volunteers: ids})
  }

  cancel() {
    this.canceller.emit();
  }
}
;