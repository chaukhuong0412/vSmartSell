import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warehouse } from '../warehouse/warehouse.service';
import { Producer } from '../producer/producer.service';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ProductNameService {

  apiURL: string = Config.baseWarehouseURL + '/api/product-name';


  constructor(private _http: HttpClient) { }

  getAllProductNames(): Observable<ProductName[]> {
    return this._http.get<ProductName[]>(this.apiURL);
  }

  getListProductNames(reqModelGetListProductName): Observable<ProductName[]> {
    let params = new HttpParams();
    params = params.append('IsAscending',reqModelGetListProductName.isAscending);
    params = params.append('SortField',reqModelGetListProductName.sortField);
    params = params.append('PageIndex',reqModelGetListProductName.pageIndex);
    params = params.append('PageSize',reqModelGetListProductName.pageSize);
    params = params.append('SearchString',reqModelGetListProductName.searchString);
    params = params.append('WarehouseId',reqModelGetListProductName.warehouseId);
    if (reqModelGetListProductName.producerIds.length != 0) {
      reqModelGetListProductName.producerIds.forEach(id => {
        params = params.append('ProducerIds',id);
      });
    }

    return this._http.get<ProductName[]>(this.apiURL, { params: params });
  }

  getProductName(productNameId): Observable<ProductName> {
    return this._http.get<ProductName>(`${this.apiURL}/${productNameId}`);
  }

  createProductName(productName): Observable<ProductName> {
    return this._http.post<ProductName>(this.apiURL, productName);
  }

  updateProductName(productName) {
    return this._http.put(this.apiURL, productName);
  }

  deleteProductName(productNameId) {
    return this._http.delete(`${this.apiURL}/${productNameId}`);
  }

}


export class ProductName {
  id: number;
  name: string;
  groupProductTypeId: number;
  producerId: number;
  unitIds: number[];
  waveTypeIds: number[];
  warehouses: Warehouse[];
}

export class ReqModelGetListProductName {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
  producerIds: number[];
  warehouseId: number;
}

export enum ESortField {
  Name
}
