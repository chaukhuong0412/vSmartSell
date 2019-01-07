import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProducerViewModel } from './producer.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private _http: HttpClient) { }

  getListSupplier(): Observable<Supplier[]> {
    return this._http.get<Supplier[]>('https://localhost:44392/api/supplier');
  }

  createSupplier(supplier): Observable<Supplier> {
    return this._http.post<Supplier>('https://localhost:44392/api/supplier/create', supplier);
  }

  delete(id) {
    return this._http.delete('https://localhost:44392/api/supplier/' + id);
  }

  getSupplier(id): Observable<Supplier> {
    return this._http.get<Supplier>('https://localhost:44392/api/supplier/' + id);
  }

  editSupplier(supplier) {
    return this._http.post('https://localhost:44392/api/supplier/edit', supplier);
  }
}


export class Supplier {
  id: number;
  name: string;
  producers: ProducerViewModel[];
}

export class ReqModelGetListSupplier {
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

