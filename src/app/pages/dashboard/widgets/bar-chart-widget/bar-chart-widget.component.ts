import { Component, ElementRef, Input, ViewChild, OnChanges } from '@angular/core';
import * as Chart from 'chart.js';
import { ChartConfiguration, ChartData } from 'chart.js';
import defaultsDeep from 'lodash-es/defaultsDeep';
import { defaultChartOptions, barChartOptions } from '../../../../../@sar/shared/chart-widget/chart-widget-defaults';
import { BarChartWidgetOptions } from './bar-chart-widget-options.interface';

@Component({
  selector: 'sar-bar-chart-widget',
  templateUrl: './bar-chart-widget.component.html',
  styleUrls: ['./bar-chart-widget.component.scss']
})
export class BarChartWidgetComponent implements OnChanges {

  @Input() data: ChartData;
  @Input() options: BarChartWidgetOptions;

  @ViewChild('canvas', { read: ElementRef, static: true }) canvas: ElementRef;

  chart: Chart;

  isLoading: boolean = true;

  constructor() {
  }


  ngOnChanges(changes) {
      if(changes.data != undefined && changes.data.currentValue != undefined && changes.data.currentValue != null){
        this.chart = new Chart(this.canvas.nativeElement.getContext('2d'), <ChartConfiguration>{
          type: 'bar',
          data: this.data,
          options: defaultsDeep({
            layout: {
              padding: {
                left: 24,
                right: 24,
                top: 16,
                bottom: 24
              }
            },
            scales: {
              xAxes: [{
                barPercentage: .5,
              }],
              yAxes:[{
                minBarLength: 20
              }]
            },
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              intersect: true
            },
            minBarLength: 2,
          }, barChartOptions)
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
