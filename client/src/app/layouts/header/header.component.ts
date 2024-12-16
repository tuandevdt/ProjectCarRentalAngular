import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthServiceService } from '../../service/auth/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private authService: AuthServiceService) { }
  isLogin = false;
  isActive = true;
  user: any | null = null;
  ngOnInit(): void {
    this.user = this.authService.getUser(); 
    if(this.user) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["/login"]);
  }
}
