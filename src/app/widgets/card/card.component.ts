import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import * as HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  label!: string;
  @Input()
  total!: string;
  @Input()
  percentage!: string;
  chartOptions!: {};
  Highcharts=Highcharts;
  constructor() { }

  ngOnInit(): void {
    this.chartOptions={
      chart: {
          type: 'area',
          backgroundColor:null,
          borderWidth:0,
          margin:[2,2],
          height:50,
      },
      title: {
          text: null
      },
      subtitle: {
          text:null
      },
      tooltip: {
          split: true,
          outside:true
      },
      legend:{
        enabled:false,
      },
      credits:{
        enabled:false,
      },
      exporting:{
        enabled:false,
      },
      xAxis:{
        labels:{
          enabled:false
        },
        title:{
          text:null
        },
        startOnTick:false,
        endOnTick:false,tickOption:[]
      },
      yAxis:{
        labels:{
          enabled:false
        },
        title:{
          text:null
        },
        startOnTick:false,
        endOnTick:false,tickOption:[]
      },
      series: [{
          
          data: [20, 10,40,60,70]
      }]
  };
  }

}
