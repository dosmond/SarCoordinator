import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuditPageService } from './../audit-page.service';
import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { AuthProcessService } from '../../authentication/auth-service';
import { ICase } from 'src/app/models/ICase';
import { AuditPageWidgetOptions } from './audit-page-widget-options';
import { ChartData } from 'chart.js';
import { ListColumn } from 'src/@fury/shared/list/list-column.model';

@Component({
  selector: 'audit-page-widget',
  templateUrl: './audit-page-widget.component.html',
  styleUrls: ['./audit-page-widget.component.scss']
})
export class AuditPageWidgetComponent implements OnInit {
    @Input() tableOptions: {
        pageSize: number;
        columns: ListColumn[]
      };
      @Input() tableData: any[];
      @Input() chartData: ChartData;
      @Input() options: AuditPageWidgetOptions;
      @Input() threshold: number
      @Input() caseId: string;
      @Output() queryDates = new EventEmitter();
      @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;
    
      minDate: Date;
      maxDate: Date;
      dateFormGroup: FormGroup;
      chart: Chart;
      data : ICase[];
      isLoading: boolean;
    
      constructor(private auditService : AuditPageService,
                private afa: AuthProcessService,
                private fb: FormBuilder) {
      }
    
      ngOnInit() {
        this.dateFormGroup = this.fb.group({
          threshold: [null, Validators.required],
          startDate: [null, Validators.required],
          endDate: [null],
        });
      }
    
    
      async reload() {
        this.isLoading = true;
        setTimeout(() => {
          this.isLoading = false;
        }, 1000);
        this.afa.getIdToken().then(token => {
          this.auditService.getCaseData(this.caseId, token).subscribe(res => {
            this.data = [(res as ICase)];
            this.tableData = this.data[0].volunteers;
          });
        })
      }
    
      deleteRow(row){
        this.afa.getIdToken().then(token => {
          this.auditService.deleteVolunteerFromRow(token, this.caseId, row.userId).subscribe(res => {
            this.reload()
          })
        })
      }

      updateMin(date){
        this.minDate = date.value
      }

      updateMax(date){
        this.maxDate = date.value
      }

      submit(){
        this.queryDates.emit(this.dateFormGroup.value)
      }
}
