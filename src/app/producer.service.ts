import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierViewModel } from './supplier.service';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {

  constructor(private _http: HttpClient) { }

  getListProducer(): Observable<Producer[]> {
    return this._http.get<Producer[]>('https://localhost:44392/api/Producer');
  }

  createProducer(producer): Observable<Producer> {
    return this._http.post<Producer>('https://localhost:44392/api/Producer/create', producer);
  }

  delete(id) {
    return this._http.delete('https://localhost:44392/api/Producer/' + id);
  }

  getProducer(id): Observable<Producer> {
    return this._http.get<Producer>('https://localhost:44392/api/Producer/' + id);
  }

  editProducer(producer) {
    return this._http.post('https://localhost:44392/api/Producer/edit', producer);
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