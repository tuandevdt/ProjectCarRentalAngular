import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header-admin.component.html',
  styleUrl: './header-admin.component.css'
})
export class HeaderAdminComponent implements OnInit {
  constructor(private router: Router) { }
  firstName: string = "Tuấn ";
  lastName: string = "Admin";
  isLogin = false;
  isActive = true;
  name: string = "";
  ngOnInit(): void {
    if (typeof window !== 'undefined') { 
      const token = localStorage.getItem("accessToken");
      const jwtHelper = new JwtHelperService();

      try {
        if (!jwtHelper.isTokenExpired(token)) {
          const decoded: any = jwtDecode(token as string);
          this.isLogin = true;
          this.name = decoded.username;
        } else {
          this.isLogin = false;
        }
      } catch (error) {
        this.isLogin = false;
      }
    }
  }
  getName() {
    return this.firstName + this.lastName;
  }
  logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.router.navigate(["/login"]);
  }
}
