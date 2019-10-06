import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData } from 'chart.js';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { CaseDataWidgetOptions } from './case-data-widget-options.interface';

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

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;

  isLoading: boolean;

  constructor() {
  }

  ngOnInit() {
  }


  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
