import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartData } from 'chart.js';
import { ListColumn } from '../../../../../@fury/shared/list/list-column.model';
import { RecentSalesWidgetOptions } from './recent-sales-widget-options.interface';

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

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;

  isLoading: boolean;

  constructor() {
  }

  ngOnInit() {}

  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
