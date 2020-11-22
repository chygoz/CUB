import { Component, OnInit } from '@angular/core';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../app.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  admins;
  constructor(public dialog: MatDialog, private service: AppService) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  addAdmin(){
    let dialogRef = this.dialog.open(AddAdminComponent, { panelClass: 'my-full-screen-dialog', width: '700px', });

    dialogRef.afterClosed().subscribe(() => {
      this.getAdmins();
    })
  }

  getAdmins(){
    this.service.getAdmins({}).subscribe((resp) => {
      if(resp.status){
        this.admins = resp.data;
      }
      console.log(this.admins)
    })
  }

  removeAdmin(user){
    this.service.removeAdminById({_id: user._id}).subscribe((resp) => {
      console.log(resp);
      this.admins = null;
      this.getAdmins();
    })
  }
}
