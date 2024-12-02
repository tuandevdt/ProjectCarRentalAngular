import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { LoginService } from '../../login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  constructor(private loginService: LoginService, private router: Router) { } // Inject Router

  formLoginGroup: FormGroup = new FormGroup({
    emailControl: new FormControl(null, [
      Validators.required,
      Validators.minLength(5),
    ]),
    passwordControl: new FormControl(null),
  });


  get loginFormControl() {
    return this.formLoginGroup.controls;
  }

  async login() {  // Đánh dấu phương thức là async
    console.log('datalogin', this.formLoginGroup.value);
    
    const email = this.formLoginGroup.value.emailControl;
    const password = this.formLoginGroup.value.passwordControl;
    const dataLogin = { email, password };
    this.loginService.login(email, password).subscribe((data: any) => {
      console.log("datalogin", data);
      if(data.status == 200) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);

          this.router.navigate(["/admin"]);
      } else {
        alert(data.message);
      }

    })

  }
}
