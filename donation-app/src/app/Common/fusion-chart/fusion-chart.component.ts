import { Component, OnInit } from '@angular/core';
import * as FusionCharts from 'fusioncharts';
import { FusionChartsModule } from 'angular-fusioncharts';
import 'fusioncharts/fusioncharts.charts';

@Component({
  selector: 'app-fusion-chart',
  imports: [FusionChartsModule],
  templateUrl: './fusion-chart.component.html',
  styleUrl: './fusion-chart.component.css'
})

export class FusionChartComponent implements OnInit {

  chartData: any[] = [
    { label: 'January', value: '420' },
    { label: 'February', value: '550' },
    { label: 'March', value: '720' },
    { label: 'April', value: '890' }
  ];

  chartConfig = {
    type: 'column2d',  // Set the chart type (e.g., 'column2d', 'pie3d', etc.)
    width: '600',       // Width of the chart
    height: '400',      // Height of the chart
    dataFormat: 'json', // Data format
    dataSource: {
      chart: {
        caption: 'Monthly Sales',
        xAxisName: 'Month',
        yAxisName: 'Sales',
        theme: 'fusion'
      },
      data: this.chartData
    }
  };

  constructor() {}

  ngOnInit() {}

}