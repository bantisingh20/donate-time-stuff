import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
 

@Component({
  selector: 'app-fusion-chart',
  standalone: true,
  imports: [],
  templateUrl: './fusion-chart.component.html',
  styleUrls: ['./fusion-chart.component.css']
})
export class FusionChartComponent implements OnInit {
  dataSource: Object = {};
  isBrowser: boolean = false;

   

  ngOnInit(): void {
     
  }

  
}
