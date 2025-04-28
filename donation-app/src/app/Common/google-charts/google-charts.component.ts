import { Component, OnInit } from '@angular/core';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';

@Component({
  selector: 'app-google-charts',
  templateUrl: './google-charts.component.html',
  styleUrls: ['./google-charts.component.css'],
  standalone: true,
  imports: [GoogleChartsModule]
})
export class GoogleChartsComponent implements OnInit {
  // Chart properties
  chartType: ChartType = ChartType.ColumnChart;
  chartData: any[] = [];
  chartColumns: string[] = [];
  chartOptions: any = {};
  chartWidth = 1000;
  chartHeight = 400;

  constructor() {}

  ngOnInit() {
    // Load default chart
    this.loadColumnChart();
  }

  // Column Chart
  loadColumnChart() {
    this.chartType = ChartType.ColumnChart;
    this.chartColumns = ['Year', 'Sales'];
    this.chartData = [
      ['2014', 1000],
      ['2015', 1200],
      ['2016', 1500],
      ['2017', 1700]
    ];
    this.chartOptions = {
      title: 'Sales Over Time',
      hAxis: { title: 'Year' },
      vAxis: { title: 'Sales' },
      colors: ['#4caf50']
    };
  }

  // Pie Chart
  loadPieChart() {
    this.chartType = ChartType.PieChart;
    this.chartColumns = ['Category', 'Value'];
    this.chartData = [
      ['Food', 1000],
      ['Transport', 700],
      ['Rent', 1200]
    ];
    this.chartOptions = {
      title: 'Expenses Distribution',
      is3D: true,
      colors: ['#ff5722', '#2196f3', '#8bc34a']
    };
  }

  // Line Chart
  loadLineChart() {
    this.chartType = ChartType.LineChart;
    this.chartColumns = ['Month', 'Revenue'];
    this.chartData = [
      ['Jan', 500],
      ['Feb', 600],
      ['Mar', 700],
      ['Apr', 800],
      ['May', 900]
    ];
    this.chartOptions = {
      title: 'Revenue Over Time',
      hAxis: { title: 'Month' },
      vAxis: { title: 'Revenue' },
      legend: { position: 'bottom' },
      curveType: 'function'
    };
  }

  // Area Chart
  loadAreaChart() {
    this.chartType = ChartType.AreaChart;
    this.chartColumns = ['Month', 'Sales'];
    this.chartData = [
      ['Jan', 800],
      ['Feb', 950],
      ['Mar', 1200],
      ['Apr', 1500]
    ];
    this.chartOptions = {
      title: 'Sales Area Chart',
      hAxis: { title: 'Month' },
      vAxis: { title: 'Sales' },
      colors: ['#8e44ad']
    };
  }

  // Combo Chart
  loadComboChart() {
    this.chartType = ChartType.ComboChart;
    this.chartColumns = ['Year', 'Sales', 'Profit'];
    this.chartData = [
      ['2015', 1000, 400],
      ['2016', 1200, 500],
      ['2017', 1500, 700]
    ];
    this.chartOptions = {
      title: 'Sales vs Profit',
      seriesType: 'bars',
      series: {
        1: { type: 'line' }
      },
      hAxis: { title: 'Year' },
      vAxis: { title: 'Amount' }
    };
  }

  // Scatter Chart
  loadScatterChart() {
    this.chartType = ChartType.ScatterChart;
    this.chartColumns = ['X', 'Y'];
    this.chartData = [
      [1, 2],
      [2, 4],
      [3, 6],
      [4, 8]
    ];
    this.chartOptions = {
      title: 'Scatter Plot Example',
      hAxis: { title: 'X Values' },
      vAxis: { title: 'Y Values' },
      legend: { position: 'none' }
    };
  }

  // Bubble Chart
  loadBubbleChart() {
    this.chartType = ChartType.BubbleChart;
    this.chartColumns = ['ID', 'X', 'Y', 'Size'];
    this.chartData = [
      [1, 1, 1, 10],
      [2, 2, 4, 20],
      [3, 3, 9, 30]
    ];
    this.chartOptions = {
      title: 'Bubble Chart Example',
      hAxis: { title: 'X' },
      vAxis: { title: 'Y' },
      sizeAxis: { minSize: 5, maxSize: 30 }
    };
  }

  // Geo Chart
  loadGeoChart() {
    this.chartType = ChartType.GeoChart;
    this.chartColumns = ['Country', 'Population'];
    this.chartData = [
      ['US', 331883986],
      ['IN', 1393409038],
      ['CN', 1444216107]
    ];
    this.chartOptions = {
      title: 'Population by Country',
      colorAxis: { colors: ['#ff0000', '#00ff00'] }
    };
  }

  // Timeline Chart
  loadTimelineChart() {
    this.chartType = ChartType.Timeline;
    this.chartColumns = ['Name', 'Start', 'End'];
    this.chartData = [
      ['Work', new Date(2021, 0, 1), new Date(2021, 11, 31)],
      ['Vacation', new Date(2021, 5, 1), new Date(2021, 5, 14)],
      ['Work', new Date(2021, 7, 1), new Date(2021, 11, 31)]
    ];
    this.chartOptions = {
      title: 'Timeline Example',
      height: 400
    };
  }

  // Gauge Chart
  loadGaugeChart() {
    this.chartType = ChartType.Gauge;
    this.chartColumns = ['Label', 'Value'];
    this.chartData = [
      ['Speed', 80]
    ];
    this.chartOptions = {
      title: 'Speedometer Gauge',
      min: 0,
      max: 100,
      redFrom: 90,
      redTo: 100,
      yellowFrom: 75,
      yellowTo: 90,
      greenFrom: 0,
      greenTo: 75,
      minorTicks: 5
    };
  }

  // Function to download chart as an image
  downloadChart(chart: any) {
    debugger;
    if (chart && typeof chart.getImageURI === 'function') {
      const imageURI = chart.getImageURI();
      const link = document.createElement('a');
      link.href = imageURI;
      link.download = 'chart.png';
      link.click();
    }
  }
  

  // Function to handle chart type change
  changeChartType(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    if (selectElement) {
      const newChartType = selectElement.value as ChartType;
      this.chartType = newChartType;
      
      switch (newChartType) {
        case ChartType.ColumnChart:
          this.loadColumnChart();
          break;
        case ChartType.PieChart:
          this.loadPieChart();
          break;
        case ChartType.LineChart:
          this.loadLineChart();
          break;
        case ChartType.AreaChart:
          this.loadAreaChart();
          break;
        case ChartType.ComboChart:
          this.loadComboChart();
          break;
        case ChartType.ScatterChart:
          this.loadScatterChart();
          break;
        case ChartType.BubbleChart:
          this.loadBubbleChart();
          break;
        case ChartType.GeoChart:
          this.loadGeoChart();
          break;
        case ChartType.Timeline:
          this.loadTimelineChart();
          break;
        case ChartType.Gauge:
          this.loadGaugeChart();
          break;
      }
    }
  }
}
