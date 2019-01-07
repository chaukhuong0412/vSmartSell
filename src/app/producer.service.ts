import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Supplier } from './supplier.service';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private _http: HttpClient) {
  }

  getProducer(id): Observable<ProducerViewModel> {
    return this._http.get<ProducerViewModel>('https://localhost:44392/api/producer/' + id);
  }

  getListProducerOrderBy(reqModelGetListProducer): Observable<ProducerViewModel[]> {
    return this._http.post<ProducerViewModel[]>('https://localhost:44392/api/producer/sort', reqModelGetListProducer);
  }

  createProducer(producer): Observable<ProducerBindingModel> {
    return this._http.post<ProducerBindingModel>('https://localhost:44392/api/producer/create', producer);
  }

  deleteProducer(id) {
    return this._http.delete('https://localhost:44392/api/producer/' + id);
  }

  editProducer(producer) {
    return this._http.post('https://localhost:44392/api/producer/edit', producer);
  }

}

export class ProducerBindingModel {
  id: number;
  name: string;
  code: string;
  phoneNumber: string;
  address: string;
  beginningPeriodDebt: number;
  currentDebt: number;
  supplierIds: number[];
  createAt: Date;
}

export class ProducerViewModel {
  id: number;
  name: string;
  code: string;
  phoneNumber: string;
  address: string;
  beginningPeriodDebt: number;
  currentDebt: number;
  suppliers: Supplier[];
  createAt: Date;
}

export class ReqModelGetListProducer {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
  fromDate: Date;
  toDate: Date;
  supplierIds: number[];
}

export enum ESortField {
  Name,
  CreateAt
}
