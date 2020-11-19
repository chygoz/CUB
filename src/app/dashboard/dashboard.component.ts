import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'chartjs-plugin-annotation';
import { ThemeService } from 'ng2-charts';
import { IDayCalendarConfig, DatePickerComponent } from "ng2-date-picker";
import { AppService } from '../app.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("myCanvas")
  public canvas: ElementRef;
  public context: CanvasRenderingContext2D;
  public chartType: string = "line";
  public chartData: any[];
  public chartLabels: any[];
  public chartColors: any[];
  public chartOptions: any;
  date = new Date();
  weekDaysArr = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
  eventData;

  datePickerConfig = {
    format: 'DD-MM-YYYY'
  };

  constructor(private service: AppService) {
  }

  ngOnInit(): void {

    this.getEventByDate();
    this.getOneWeekData();
  }

  dateSelect(event){
    this.date = event;
    this.getEventByDate();
  }

  getEventByDate(){
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
      if(resp.status){
        this.eventData = resp.data[0];
      }else {
        this.eventData = null;
      }

    })
  }

  getOneWeekData() {
    this.service.getOneWeekData({}).subscribe((resp) => {
      console.log(resp);
      if(resp.status){
        let graphData = [];
        let weekArr = [];
        let maleArr = [];
        let femaleArr = [];
        //playground
        for(let i=6;i>=0;i--){
          let day = new Date();
          day.setDate(day.getDate() - i);
          let week = day.getDay();
          let exists = resp.data.find(arr => new Date(arr.eventDate).getDay() == day.getDay());
          if(exists){
            graphData.push({day: this.weekDaysArr[week], male: exists.male, female: exists.female});  
            weekArr.push(this.weekDaysArr[week]);
            maleArr.push(exists.male);
            femaleArr.push(exists.female);
          }else {
            graphData.push({day: this.weekDaysArr[week], male: 0, female: 0});
            weekArr.push(this.weekDaysArr[week]);
            maleArr.push(0);
            femaleArr.push(0);
          }
        }
        //console.log(graphData);
        this.loadLineChart(weekArr, maleArr, femaleArr);
      }
    })
  }

  loadLineChart(weekArr, maleArr, femaleArr){
    this.chartData = [
      {
        data: maleArr,
        label: "Male",
        fill: true
      },
      {
        data: femaleArr,
        label: "Female",
        fill: true
      }
    ];
    this.chartLabels = weekArr;
    this.chartColors = [
      {
        backgroundColor: "#673d7e",
      },
      {
        backgroundColor: "#fecc5a",
      }
    ];
    this.chartOptions = {
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawBorder: true,
              display: false
          }
        }
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: true,
              display: false
          },
            ticks: {
              beginAtZero: true,
              suggestedMin: 50,
              stepSize: 50
            }
          }
        ]
      }
    };
  }

}
