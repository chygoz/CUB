import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import 'chartjs-plugin-annotation';
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

  constructor() {
    console.log("called here ")
  }

  ngOnInit(): void {
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

}
