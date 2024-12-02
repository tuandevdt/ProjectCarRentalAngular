import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = "https://674015eed0b59228b7ee9a9f.mockapi.io/users";

  constructor(private httpService: HttpClient) {}
   getAllData() {
    return this.httpService.get(this.url);
   }
   getDataQuerry(q: string) {
    return this.httpService.get(`${this.url}?name=${q}`)
   }
}
