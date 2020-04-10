import { animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, ViewChild, OnChanges, AfterContentInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import * as ChartJSPieceLabelPlugin from 'chart.piecelabel.js';
import defaultsDeep from 'lodash-es/defaultsDeep';
import { defaultChartOptions } from '../../../../../@sar/shared/chart-widget/chart-widget-defaults';
import { LineChartWidgetOptions } from '../line-chart-widget/line-chart-widget-options.interface';

@Component({
  selector: 'sar-donut-chart-widget',
  templateUrl: './donut-chart-widget.component.html',
  styleUrls: ['./donut-chart-widget.component.scss']
})
export class DonutChartWidgetComponent implements OnChanges {

  @Input() data: ChartData;
  @Input() options: LineChartWidgetOptions;
  @Input() total: number

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;

  isLoading: boolean = true;

  constructor() {
  }

  ngOnChanges(changes){
    if(changes.data != undefined && changes.data.currentValue != undefined && changes.data.currentValue != null){
      this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), <ChartConfiguration>{
        type: 'pie',
        data: this.data,
        options: defaultsDeep({
          layout: {
            padding: {
              left: 5,
              right: 5,
              top: 5
            }
          },
          plugins: [ChartJSPieceLabelPlugin],
          pieceLabel: {
            render: 'label',
            arc: true,
            position: 'border',
            fontColor: '#FFFFFF'
          }
        }, defaultChartOptions)
      });
      this.isLoading = false
    }

  }

  reload() {
    this.isLoading = true;

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
