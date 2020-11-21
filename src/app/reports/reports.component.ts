import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  //chart code start
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['A.Male', 'A.Feale', 'C.Male', 'C.Female'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [65, 59, 80, 81], label: 'Series A',
      stack: 'a',
      backgroundColor: ["#673d7e", "#fecc5a", "#127cc9", "#fd80d3"]
    }
  ];
  //chart code end
  //PIE code start
  public doughnutChartLabels: string[] = ['A.Male', 'A.Female', 'c.Male', 'c.Female'];
  public doughnutChartData: number[] = [50, 100, 120, 200];
  chartOptions = {
    responsive: true,
    cutoutPercentage: 80,
    position: 'bottom',
    legend: {
      display: true,
      position: 'bottom'
    }
  };

  //PIE code end

  date = new Date();
  eventData;
  eventReport;
  datePickerConfig = {
    format: 'DD-MM-YYYY'
  };

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getEventByDate();
    this.getReportsBydate();

  }

  dateSelect(event) {
    this.date = event;
    this.getEventByDate();
    this.getReportsBydate();
  }

  getEventByDate() {
    var d = new Date(this.date);
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    if (d.getDate() < 10) {
      day = '0' + day;
    }
    if (d.getMonth() < 9) {
      month = '0' + month;
    }
    let date = d.getFullYear() + '-' + month + '-' + day;
    let params = {
      date: date
    }
    this.service.getEventBydate(params).subscribe((resp) => {
      if (resp.status) {
        this.eventData = resp.data[0];
      } else {
        this.eventData = null;
      }

    })
  }

  getReportsBydate() {
    var d = new Date(this.date);
    let day = '' + d.getDate();
    let month = '' + (d.getMonth() + 1);
    if (d.getDate() < 10) {
      day = '0' + day;
    }
    if (d.getMonth() < 9) {
      month = '0' + month;
    }
    let date = d.getFullYear() + '-' + month + '-' + day;
    let params = {
      date: date
    }
    this.service.getReportsBydate(params).subscribe((resp) => {
      if (resp.status) {
        this.eventReport = resp.data;
      } else {
        this.eventReport = null;
      }

    })
  }

}
