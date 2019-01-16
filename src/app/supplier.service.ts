

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producer } from './producer.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private _http: HttpClient) {
  }

  getSupplier(id): Observable<SupplierViewModel> {
    return this._http.get<SupplierViewModel>('https://localhost:44392/api/Supplier/' + id);
  }

  getListSupplierOrderBy(reqModelGetListSupplier): Observable<SupplierViewModel[]> {
    return this._http.post<SupplierViewModel[]>('https://localhost:44392/api/Supplier/sort', reqModelGetListSupplier);
  }

  createSupplier(supplier): Observable<SupplierBindingModel> {
    return this._http.post<SupplierBindingModel>('https://localhost:44392/api/supplier/create', supplier);
  }

  deleteSupplier(id) {
    return this._http.delete('https://localhost:44392/api/Supplier/' + id);
  }

  editSupplier(supplier) {
    return this._http.post('https://localhost:44392/api/Supplier/edit', supplier);
  }

  getPaymentsOfSupplier(supplierId): Observable<Payment[]> {
    return this._http.get<Payment[]>('https://localhost:44392/api/Supplier/' + supplierId + '/payments')
  }

  createPayment(payment): Observable<Payment> {
    return this._http.post<Payment>('https://localhost:44392/api/Supplier/Payment', payment);
  }

  getDebtAtGivenDate(requestDebtModel): Observable<number> {
    return this._http.post<number>('https://localhost:44392/api/supplier/debt', requestDebtModel);
  }

  

}

export class SupplierBindingModel {
  id: number;
  name: string;
  code: string;
  phoneNumber: string;
  address: string;
  beginningPeriodDebt: number;
  currentDebt: number;
  producerIds: number[];
  createAt: Date;
  note: string;
}

export class SupplierViewModel {
  id: number;
  name: string;
  code: string;
  phoneNumber: string;
  address: string;
  beginningPeriodDebt: number;
  currentDebt: number;
  producers: Producer[];
  createAt: Date;
  note: string;
}

export class ReqModelGetListSupplier {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
  fromDate: Date;
  toDate: Date;
  producerIds: number[];
}

export enum ESortField {
  Name,
  CreateAt
}


export class Payment {
  id: number;
  date: Date;
  debt: number;
  amount: number;
  rest: number;
}

export class RequestDebtModel {
  supplierId: number;
  date: Date;
}