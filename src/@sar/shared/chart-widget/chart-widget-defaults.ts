import { ChartOptions } from 'chart.js';

export const defaultChartOptions: ChartOptions = {
  responsive: true,
  responsiveAnimationDuration: 1,
  animation: {
    duration: 1000,
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: false
    }],
    yAxes: [{
      display: false
    }]
  },
  tooltips: {
    titleFontFamily: 'Roboto, \'Helvetica Neue\', Arial, sans-serif',
    bodyFontFamily: 'Roboto, \'Helvetica Neue\', Arial, sans-serif',
    footerFontFamily: 'Roboto, \'Helvetica Neue\', Arial, sans-serif'
  }
};

export const barChartOptions: ChartOptions = {
  responsive: true,
  responsiveAnimationDuration: 1,
  animation: {
    duration: 1000,
  },
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [{
      display: true
    }],
    yAxes: [{
      display: true
    }]
  },
  tooltips: {
    titleFontFamily: 'Roboto, \'Helvetica Neue\', Arial, sans-serif',
    bodyFontFamily: 'Roboto, \'Helvetica Neue\', Arial, sans-serif',
    footerFontFamily: 'Roboto, \'Helvetica Neue\', Arial, sans-serif'
  }
}
