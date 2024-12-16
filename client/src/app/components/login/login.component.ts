import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../service/auth/auth-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  formLoginGroup: FormGroup;

  constructor(private loginService: AuthServiceService, private router: Router, private fb: FormBuilder) { 

    this.formLoginGroup = this.fb.group({
      emailControl: [null, [Validators.required, Validators.email, Validators.minLength(5)]],
      passwordControl: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  get loginFormControl() {
    return this.formLoginGroup.controls;
  }

  async login() { 
    if(this.formLoginGroup.invalid){
      alert('Vui lòng nhập đầy đủ thông tin đăng nhập!')
      return;
    }
    const email = this.formLoginGroup.value.emailControl;
    const password = this.formLoginGroup.value.passwordControl;
    this.loginService.login(email, password).subscribe((data: any) => {
      if(data.status == 200) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        this.router.navigate(['/admin/dashboard']);
      } else {
        alert(data.message);
      }
    })
  }
}
