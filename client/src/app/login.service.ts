import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:3000/v1/api/auth/login";
  constructor(private http: HttpClient) { }
  login(email: string, password: string) {
    return this.http.post(this.url, { email, password})
  }
}
