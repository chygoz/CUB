import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  loginErr = '';
  constructor(private formBuilder: FormBuilder, private service: AppService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm= this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  get f() { return this.loginForm.controls; }

  onSubmit(){
    this.loginErr = '';
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
    this.service.login(this.loginForm.value).subscribe((resp) => {
      console.log(resp);
      if(resp.status){
        localStorage.setItem('token', resp.token);
        this.router.navigate(['/dashboard']);

      }else {
        this.loginErr = 'Invalid Credentials!';
    }
    })

  }

}
