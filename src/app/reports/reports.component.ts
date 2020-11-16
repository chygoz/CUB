import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  date = new Date();
  eventData;
  datePickerConfig = {
    format: 'DD-MM-YYYY'
  };

  constructor(private service: AppService) { }

  ngOnInit(): void {
    this.getEventByDate();
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

}
