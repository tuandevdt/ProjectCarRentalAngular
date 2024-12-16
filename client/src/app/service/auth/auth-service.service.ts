import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private tokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';
  url = "http://localhost:3000/v1/api/auth";
  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password})
  }

  getUser(): any | null {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem(this.tokenKey);
          // if (token) {
          //   const decodedToken: any = jwtDecode(token);
          //   console.log('token accesss', decodedToken);
          // }

          if (token && !this.isTokenExpired(token)) {
            const decodedToken: any = jwtDecode(token);
            console.log('token accesss', decodedToken);

            return {
              userId: decodedToken.id,
              username: decodedToken.username,
            };
          }
          console.log('no token');
          
          return null;
         }
  }

  isTokenExpired(token: string): boolean {
    try {
      const decodedToken: any = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); 
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error('Invalid token', error);
      return true;
    }
  }

  refreshToken() {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    if (!refreshToken) {
      return of(false); 
    }
  
    return this.http.post<{ accessToken: string }>(`${this.url}/refresh`, { refreshToken }).pipe(
      map((response) => {
        
        if (response.accessToken) {
          console.log(1111);
          
          localStorage.setItem(this.tokenKey, response.accessToken);
          return true; 
        }
        return false;
      }),
      catchError((error) => {
        console.error('Failed to refresh token', error);
        return of(false); 
      })
    );
  }
  
}
