import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private _http: HttpClient) {
  }

  getListCuaHangs(): Observable<Store[]> {
    return this._http.get<Store[]>('https://localhost:44305/api/store');
  }

  getListCuaHangManagedBy(user) : Observable<Store[]> {
    return this._http.get<Store[]>('https://localhost:44305/api/store/managedby/' + user);
  }

  getListCuaHangsExcept(id): Observable<Store[]> {
    return this._http.get<Store[]>('https://localhost:44305/api/store/all/' + id);
  }

  getListCuaHangOrderBy(reqModelGetListCuaHang): Observable<StoreViewModel[]> {
    if (reqModelGetListCuaHang.searchString == "")
      return this._http.get<StoreViewModel[]>('https://localhost:44305/api/store/sort?IsAscending=' 
      + reqModelGetListCuaHang.isAscending + '&SortField=' + reqModelGetListCuaHang.sortField
      + '&PageIndex=' + reqModelGetListCuaHang.pageIndex + '&PageSize=' + reqModelGetListCuaHang.pageSize);
    else 
      return this._http.get<StoreViewModel[]>('https://localhost:44305/api/store/sort?IsAscending=' 
        + reqModelGetListCuaHang.isAscending + '&SortField=' + reqModelGetListCuaHang.sortField
        + '&PageIndex=' + reqModelGetListCuaHang.pageIndex + '&PageSize=' + reqModelGetListCuaHang.pageSize + '&SearchString=' + reqModelGetListCuaHang.searchString);
  }

  getNumberOfCuaHangsWithSearchString(searchString): Observable<number> {
    return this._http.get<number>('https://localhost:44305/api/store/number', {params: {searchString: searchString}});
  }

  createCuaHang(cuaHang): Observable<Store> {
    return this._http.post<Store>('https://localhost:44305/api/store/create', cuaHang);
  }

  getCuaHang(id): Observable<Store> {
    return this._http.get<Store>('https://localhost:44305/api/store/' + id)
  }

  editCuaHang(cuaHang) : Observable<Store> {
    return this._http.post<Store>('https://localhost:44305/api/store/edit', cuaHang);
  }

  deleteCuaHang(id) {
    return this._http.delete('https://localhost:44305/api/store/' + id);
  }

  getStoreConfigOfStore(id) : Observable<StoreConfig[]> {
    return this._http.get<StoreConfig[]>('https://localhost:44305/api/config/store/' + id);
  }

  getStoreConfig(id) : Observable<StoreConfig> {
    return this._http.get<StoreConfig>('https://localhost:44305/api/config/' + id);
  }

  deleteStoreConfig(id) {
    return this._http.delete('https://localhost:44305/api/config/' + id);
  }

  editStoreConfig(config) {
    return this._http.post('https://localhost:44305/api/config/edit', config)
  }

  createStoreConfig(config) {
    return this._http.post('https://localhost:44305/api/config/create', config);
  }
}

export class Store {
  id : number;
  name : string;
  storeCode: string;
  phoneNumber: string;
  address: string;
  companyId : number;
}

export class StoreViewModel {
  id : number;
  name : string;
  companyName : string;
}

export class StoreConfig {
  id: number;
  key: string;
  value: string;
  description: string;
  storeId: number;
}


export class ReqModelGetListStore {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
}

export enum ESortField {
  Name
}
