import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from '../app.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  registerErr;
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor( private formBuilder: FormBuilder, private service: AppService,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, public dialogRef: MatDialogRef<AddAdminComponent>) { }

  ngOnInit(): void {
    this.registerForm= this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit(){
    this.registerErr = '';
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
  }
    this.service.register(this.registerForm.value).subscribe((resp) => {
      if(resp.status){
        this.dialog.closeAll();
      }else {
        this.registerErr = resp.msg;
    }
    })

  }
  
  close(){
    this.dialog.closeAll();
  }

}
