import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Label, Color } from 'ng2-charts';
import { SingleDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';
import { NONE_TYPE } from '@angular/compiler';
import { AppService } from '../app.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
  };
  public barChartLabels: string[];
  public polarChartLabels = [];
  public barChartType: string = 'bar';
  public polarChartType: string = 'polarArea';
  public barChartLegend: boolean = false;
  public polarChartLegend: boolean = true;


  public ChartData: any[] = [
    { data: [], label: 'A.Male' },
    { data: [], label: 'A.Female' },
    { data: [], label: 'c.Male' },
    { data: [], label: 'c.Femle' }
  ];
  public ChartDataYearly: any[] = [
    { data: [], label: 'A.Male' },
    { data: [], label: 'A.Female' },
    { data: [], label: 'c.Male' },
    { data: [], label: 'c.Femle' }
  ];



  public ChartColors: Color[] = [
    { backgroundColor: '#673d7e' },
    { backgroundColor: '#fecc5a' },
    { backgroundColor: '#127cc9' },
    { backgroundColor: '#fd80d3' }
  ]

  public polarChartColors: Color[] = [
    { backgroundColor: '#673d7e' },
    { backgroundColor: '#fecc5a' },
    { backgroundColor: '#127cc9' },
    { backgroundColor: '#fd80d3' }
  ]

  constructor(private _emp: DataService, private service: AppService) {
  }

  ngOnInit() {
    this.getYearlyData()
    this._emp.dynamicData().subscribe(data => {
      this.barChartLabels = Object.keys(data);
      this.barChartLabels.forEach(label => {
        this.ChartData[0].data.push(data[label]['adultmale']);
        this.ChartData[1].data.push(data[label]['adultfemale']);
        this.ChartData[2].data.push(data[label]['childmale']);
        this.ChartData[3].data.push(data[label]['childfemale']);
      });
    });


  }

  getYearlyData(){
    this.service.getYearlyStats({}).subscribe((resp) => {
      if(resp.status && resp.data.length > 0){
        resp.data.forEach(element => {
          this.polarChartLabels.push(element.year);
          this.ChartDataYearly[0].data.push(element.male);
          this.ChartDataYearly[1].data.push(element.female);
          this.ChartDataYearly[2].data.push(element.boys);
          this.ChartDataYearly[3].data.push(element.girls);
        });
      }
    })
  }

}
