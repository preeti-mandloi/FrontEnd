import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  chartOptions!: {};
  Highcharts=Highcharts;
  constructor() { }

  ngOnInit(): void {
    this.chartOptions={
      chart: {
          type: 'area'
      },
      title: {
          text: 'Oder Management System'
      },
      subtitle: {
          text: 'Source: Management'
      },
     
      tooltip: {
          split: true,
          valueSuffix: ' millions'
      },
      credits:{
        enabled:false,
      },
      exporting:{
        enabled:true,
      },
      series: [{
          name: '2021',
          data: [502, 635, 809, 947, 1402, 3634, 5268]
      }, {
          name: '2020',
          data: [106, 107, 111, 133, 221, 767, 1766]
      }, {
          name: '2019',
          data: [163, 203, 276, 408, 547, 729, 628]
      }, {
          name: '2018',
          data: [18, 31, 54, 156, 339, 818, 1201]
      }, {
          name: '2017',
          data: [2, 2, 2, 6, 13, 30, 46]
      }]
  };
  setTimeout(()=>{
    window.dispatchEvent(
      new Event('resize')
    );
  },300); 
  }

}
