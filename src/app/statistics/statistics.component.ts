import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Volume Sales' },
    { data: [], label: 'Value Sales' }
  ];
  constructor(private _emp: DataService) {
  }
  ngOnInit() {
    this._emp.getSales().subscribe(data => {
      this.barChartLabels = Object.keys(data);
      this.barChartLabels.forEach(label => {
        this.barChartData[0].data.push(data[label]['volumeSales']);
        this.barChartData[1].data.push(data[label]['valueSales']);
      });
    });;
  }

}
