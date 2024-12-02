// src/app/services/currency-format.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyFormatService {

  constructor() { }

  // Hàm định dạng tiền tệ Việt Nam
  formatCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(amount);
  }
}
