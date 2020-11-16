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
  eventData;

  datePickerConfig = {
    format: 'DD-MM-YYYY'
  };

  constructor(private service: AppService) {
  }

  ngOnInit(): void {
    this.getEventByDate();
    this.getOneWeekData();
    this.chartData = [
      {
        data: [3, 1, 4, 2, 5],
        label: "Male",
        fill: true
      },
      {
        data: [0, 8, 4, 6, 5],
        label: "Female",
        fill: true
      }
    ];
    this.chartLabels = ["Jan", "Feb", "Mar", "Apr", "May"];
    this.chartColors = [
      {
        backgroundColor: "#673d7e",
        //borderColor: "rgba(0, 0, 0, 1)"
      },
      {
        backgroundColor: "#fecc5a",
        //borderColor: "rgba(0, 0, 0, 1)"
      }
    ];
    this.chartOptions = {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              stepSize: 1
            }
          }
        ]
      }
    };
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
    })
  }

}
