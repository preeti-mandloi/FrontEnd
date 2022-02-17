import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import { ServiceService } from 'src/app/services/service.service';
@Component({
  selector: 'app-widget-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  chartOptions!: {};
  Highcharts=Highcharts;
    returnData: any;
  constructor(
    private http: HttpClient,
    private service:ServiceService,
  ) { }

  ngOnInit(): void {
    this.service.typePercentage().subscribe(response => {
        //   this.name=response;
        //   this.y=response;
          this.returnData=response;
        console.log("get different type of product",response);
        this.chartOptions={
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Available Product type in System'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            exporting:{
              enabled:true
            },
            credits:{
              enabled:false
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: this.returnData,
            }]
        }
        });
   


 
  

  }

}
