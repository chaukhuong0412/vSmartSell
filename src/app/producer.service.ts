import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierViewModel } from './supplier.service';

@Injectable({
  providedIn: 'root'
})
export class ProducerService {
  apiURL: string = 'https://localhost:44392/api/producer';

  constructor(private _http: HttpClient) { }

  getListProducer(): Observable<Producer[]> {
    return this._http.get<Producer[]>(this.apiURL);
  }

  createProducer(producer): Observable<Producer> {
    return this._http.post<Producer>(`${this.apiURL}/create`, producer);
  }

  delete(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  getProducer(id): Observable<Producer> {
    return this._http.get<Producer>(`${this.apiURL}/${id}`);
  }

  editProducer(producer) {
    return this._http.post(`${this.apiURL}/edit`, producer);
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