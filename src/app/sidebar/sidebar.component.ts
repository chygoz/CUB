import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
userRole = '';
  constructor() {
    this.userRole = localStorage.getItem('role');
   }

  ngOnInit(): void {
  }

}
