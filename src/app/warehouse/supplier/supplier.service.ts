

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producer } from '../producer/producer.service';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  apiURL: string = Config.baseWarehouseURL + '/api/supplier';

  constructor(private _http: HttpClient) {
  }

  getSupplier(id): Observable<SupplierViewModel> {
    return this._http.get<SupplierViewModel>(`${this.apiURL}/${id}`);
  }

  getListSupplierOrderBy(reqModelGetListSupplier): Observable<Object[]> {
    let params = new HttpParams();
    params = params.append('IsAscending',reqModelGetListSupplier.isAscending);
    params = params.append('SortField',reqModelGetListSupplier.sortField);
    params = params.append('PageIndex',reqModelGetListSupplier.pageIndex);
    params = params.append('PageSize',reqModelGetListSupplier.pageSize);
    params = params.append('SearchString',reqModelGetListSupplier.searchString);
    if (reqModelGetListSupplier.producerIds.length != 0) {
      reqModelGetListSupplier.producerIds.forEach(id => {
        params = params.append('ProducerIds',id);
      });
    }

    return this._http.get<SupplierViewModel[]>(this.apiURL, { params: params });
  }

  createSupplier(supplier): Observable<SupplierBindingModel> {
    return this._http.post<SupplierBindingModel>(`${this.apiURL}/create`, supplier);
  }

  deleteSupplier(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  editSupplier(supplier) {
    return this._http.put(this.apiURL, supplier);
  }

  getDebtAtGivenDate(requestDebtModel): Observable<number> {
    return this._http.post<number>(`${this.apiURL}/debt`, requestDebtModel);
  }
}

export class SupplierBindingModel {
  id: number;
  title: string;
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
  title: string;
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
  Title,
  CreateAt
}

export class RequestDebtModel {
  supplierId: number;
  date: Date;
}