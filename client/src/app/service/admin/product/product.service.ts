
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = "http://localhost:3000/v1/api/admin/products";
  constructor(private http: HttpClient) { }
  addProduct(data: any) {
    return this.http.post(this.url, { data });
  }
  getAllProducts() {
    return this.http.get(this.url);
  }

  getProductsByCategory(id: number) {
    return this.http.get(`${this.url}/category/${id}`)
  }

  updateProduct(data: any, id: number) {
    return this.http.patch(`${this.url}/${id}`, data); 
  }

  getProductById(id: number) {
    return this.http.get(`${this.url}/${id}`)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
