import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierViewModel } from '../supplier/supplier.service';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  apiURL: string = Config.baseWarehouseURL + '/api/warehouse';


  constructor(private _http: HttpClient) { }

  getListWarehouse(): Observable<Warehouse[]> {
    return this._http.get<Warehouse[]>(this.apiURL);
  }

  createWarehouse(warehouse): Observable<Warehouse> {
    return this._http.post<Warehouse>(this.apiURL, warehouse);
  }

  delete(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  getWarehouse(id): Observable<Warehouse> {
    return this._http.get<Warehouse>(`${this.apiURL}/${id}`);
  }

  editWarehouse(warehouse) {
    return this._http.put(this.apiURL, warehouse);
  }
}


export class Warehouse {
  id: number;
  name: string;
}

export class ReqModelGetListWarehouse {
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