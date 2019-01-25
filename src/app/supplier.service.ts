

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producer } from './producer.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  apiURL: string = 'https://localhost:44392/api/Supplier';

  constructor(private _http: HttpClient) {
  }

  getSupplier(id): Observable<SupplierViewModel> {
    return this._http.get<SupplierViewModel>(`${this.apiURL}/${id}`);
  }

  getListSupplierOrderBy(reqModelGetListSupplier): Observable<SupplierViewModel[]> {
    return this._http.post<SupplierViewModel[]>(`${this.apiURL}/sort`, reqModelGetListSupplier);
  }

  createSupplier(supplier): Observable<SupplierBindingModel> {
    return this._http.post<SupplierBindingModel>(`${this.apiURL}/create`, supplier);
  }

  deleteSupplier(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  editSupplier(supplier) {
    return this._http.post(`${this.apiURL}/edit`, supplier);
  }

  getDebtAtGivenDate(requestDebtModel): Observable<number> {
    return this._http.post<number>(`${this.apiURL}/debt`, requestDebtModel);
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

export class RequestDebtModel {
  supplierId: number;
  date: Date;
}