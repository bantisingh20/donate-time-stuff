
// src/app/chart/chart.component.ts
import { Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ChartData {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-common-chart', 
  imports: [CommonModule],
  templateUrl:'./chart.component.html',
  styles: [`
    :host {
      display: block;
      width: 100%;
    }
  `]
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() title: string = 'Chart';
  @Input() type: 'bar' | 'pie' | 'line' = 'bar';
  @Input() data: ChartData[] = [];
  @Input() colors: string[] = [];
  
  // Default teal color palette
  chartColors = {
    primary: '#0d9488',         // Teal-600
    secondary: '#14b8a6',       // Teal-500
    tertiary: '#2dd4bf',        // Teal-400
    quaternary: '#5eead4',      // Teal-300
    primaryLight: '#99f6e4',    // Teal-200
    background: '#ccfbf1',      // Teal-100
  };
  
  // Colors array generated from the teal palette
  defaultColors = [
    '#0d9488', '#14b8a6', '#2dd4bf', '#5eead4', '#99f6e4', '#ccfbf1',
    '#0f766e', '#0891b2', '#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc'
  ];
  
  // Calculated properties
  maxValue: number = 0;
  pieSlices: {path: string, color: string}[] = [];
  linePoints: string = '';
  areaPath: string = '';
  lineCoordinates: {x: number, y: number}[] = [];
  gridLines: number[] = [15, 25, 35, 45];
  labelInterval: number = 1;
  maxHeight: number =0;// undefined;

  ngOnInit() {
    const maxValue = Math.max(...this.data.map(item => item.value));
    // Set the max height (max value + 20)
    this.maxHeight = maxValue + 20;
    this.updateChart();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['type'] || changes['colors']) {
      this.updateChart();
    }
  }
  
  updateChart() {
    if (this.data.length === 0) return;
    
    this.maxValue = Math.max(...this.data.map(item => item.value));
    
    if (this.type === 'pie') {
      this.calculatePieSlices();
    } else if (this.type === 'line') {
      this.calculateLineChart();
      // Dynamically adjust label interval for readability
      this.labelInterval = Math.ceil(this.data.length / 10);
    }
  }
  
  getBarHeight(value: number): number {
    // const maxValue = Math.max(...this.data.map(item => item.value));
    // // Calculate the height in percentage relative to the maximum value
    // return (value / maxValue) * 100;

    return this.maxValue > 0 ? (value / this.maxValue) * 100 : 0;
  }
  
  getItemColor(item: ChartData, index: number): string {
    // Use item color if specified, otherwise use from colors input or default colors
    if (item.color) return item.color;
    
    if (this.colors && this.colors.length > 0) {
      return this.colors[index % this.colors.length];
    }
    
    return this.defaultColors[index % this.defaultColors.length];
  }
  
  calculatePieSlices() {
    const total = this.data.reduce((sum, item) => sum + item.value, 0);
    if (total === 0) return;
    
    this.pieSlices = [];
    let currentAngle = 0;
    
    this.data.forEach((item, index) => {
      const percentage = item.value / total;
      const angleSize = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angleSize;
      
      const x1 = 50 + 45 * Math.cos((startAngle - 90) * Math.PI / 180);
      const y1 = 50 + 45 * Math.sin((startAngle - 90) * Math.PI / 180);
      const x2 = 50 + 45 * Math.cos((endAngle - 90) * Math.PI / 180);
      const y2 = 50 + 45 * Math.sin((endAngle - 90) * Math.PI / 180);
      
      const largeArcFlag = angleSize > 180 ? 1 : 0;
      
      // Create SVG path
      const path = `
        M 50 50
        L ${x1} ${y1}
        A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2}
        Z
      `;
      
      this.pieSlices.push({
        path,
        color: this.getItemColor(item, index)
      });
      
      currentAngle = endAngle;
    });
  }
  
  calculateLineChart() {
    // Calculate line chart points
    const spacing = 80 / (this.data.length - 1 || 1);
    
    this.lineCoordinates = this.data.map((item, index) => {
      const x = 10 + (index * spacing);
      const normalizedValue = this.maxValue > 0 ? item.value / this.maxValue : 0;
      const y = 45 - (normalizedValue * 40);
      return { x, y };
    });
    
    this.linePoints = this.lineCoordinates
      .map(point => `${point.x},${point.y}`)
      .join(' ');
    
    // Calculate area path under the line
    const firstPoint = this.lineCoordinates[0];
    const lastPoint = this.lineCoordinates[this.lineCoordinates.length - 1];
    
    this.areaPath = `
      M ${firstPoint.x} ${firstPoint.y}
      ${this.linePoints}
      L ${lastPoint.x} 45
      L ${firstPoint.x} 45
      Z
    `;
  }
}