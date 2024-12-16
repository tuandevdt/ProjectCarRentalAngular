import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = "http://localhost:3000/v1/api/admin/orders";

  constructor(private http: HttpClient) { }
  getAllOrders() {
    return this.http.get(this.url);
  }
  getOrder(productId: number) {
    return this.http.get(`${this.url}/${productId}`)
  }
  addOrder(data: any) {
    return this.http.post(this.url, {data})
  }

  updateOrder(data: any, id: number) {
    return this.http.patch(`${this.url}/${id}`, {data})
  }
}
