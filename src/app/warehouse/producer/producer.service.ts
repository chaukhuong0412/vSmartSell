import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierViewModel } from '../supplier/supplier.service';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  apiURL: string = Config.baseWarehouseURL + '/api/producer';

  constructor(private _http: HttpClient) { }

  getListProducer(): Observable<Producer[]> {
    return this._http.get<Producer[]>(this.apiURL);
  }

  createProducer(producer): Observable<Producer> {
    return this._http.post<Producer>(this.apiURL, producer);
  }

  delete(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  getProducer(id): Observable<Producer> {
    return this._http.get<Producer>(`${this.apiURL}/${id}`);
  }

  editProducer(producer) {
    return this._http.put(this.apiURL, producer);
  }
}


export class Producer {
  id: number;
  name: string;
  suppliers: SupplierViewModel[];
}

export class ReqModelGetListProducer {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
}

export enum ESortField {
  Name,
  CreateAt
}