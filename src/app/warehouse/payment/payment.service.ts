

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producer } from '../producer/producer.service';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiURL: string = Config.baseWarehouseURL + '/api/payment';

  constructor(private _http: HttpClient) {
  }

  getPaymentsOfSupplier(supplierId): Observable<Payment[]> {
    return this._http.get<Payment[]>(`${this.apiURL}/supplier/${supplierId}`);
  }

  createPayment(payment): Observable<Payment> {
    return this._http.post<Payment>(this.apiURL, payment);
  }

}


export class Payment {
  id: number;
  date: Date;
  debt: number;
  amount: number;
  rest: number;
}

