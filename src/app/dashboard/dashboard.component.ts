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
    this.chartData = [
      {
        data: [3, 1, 4, 2, 5],
        label: "Anthracnose",
        fill: true
      },
      {
        data: [0, 8, 4, 6, 5],
        label: "Anthracnose",
        fill: true
      }
    ];
    this.chartLabels = ["Jan", "Feb", "Mar", "Apr", "May"];
    this.chartColors = [
      {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderColor: "rgba(0, 0, 0, 1)"
      },
      {
        backgroundColor: "rgba(0, 0.5, 0, 0.2)",
        borderColor: "rgba(0, 0, 0, 1)"
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
      },
      annotation: {
        drawTime: "beforeDatasetsDraw",
        annotations: [
          {
            type: "box",
            id: "a-box-1",
            yScaleID: "y-axis-0",
            yMin: 0,
            yMax: 1,
            backgroundColor: "#4cf03b"
          },
          {
            type: "box",
            id: "a-box-2",
            yScaleID: "y-axis-0",
            yMin: 1,
            yMax: 2.7,
            backgroundColor: "#fefe32"
          },
          {
            type: "box",
            id: "a-box-3",
            yScaleID: "y-axis-0",
            yMin: 2.7,
            yMax: 5,
            backgroundColor: "#fe3232"
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
        d.setDate(d.getDate() + 0 - (d.getDay() || 7));
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
      //date: '2020-01-13'
      date: date
    }
    this.service.getEventBydate(params).subscribe((resp) => {
      if(resp.status){
        this.eventData = resp.data[0];
      }else {
        this.eventData = null;
      }

      console.log(this.eventData);

    })
  }

}
