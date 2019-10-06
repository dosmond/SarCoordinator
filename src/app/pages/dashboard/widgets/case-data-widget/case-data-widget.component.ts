import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData } from 'chart.js';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { CaseDataWidgetOptions } from './case-data-widget-options.interface';
import { CaseDashboardService } from '../../case-dashboard/case-dashboard.service';
import { ICase } from 'src/app/models/ICase';

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

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;
  data : ICase[];
  isLoading: boolean;

  constructor(private dashboardService : CaseDashboardService) {
  }

  ngOnInit() {
  }


  async reload() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
    this.dashboardService.getCaseData(this.caseId).subscribe(res => {
      this.data = [(res as ICase)];
      console.log(this.data);
      this.tableData = this.data[0].volunteers;
    });
  }
}
