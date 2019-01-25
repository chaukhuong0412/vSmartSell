import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  apiURL: string = 'https://localhost:44305/api/store';

  constructor(private _http: HttpClient) {
  }

  getListStores(): Observable<Store[]> {
    return this._http.get<Store[]>(this.apiURL);
  }

  getListStoreManagedBy(userName) : Observable<Store[]> {
    return this._http.get<Store[]>(`${this.apiURL}/managedby/${userName}`);
  }

  getListStoresExcept(id): Observable<Store[]> {
    return this._http.get<Store[]>(`${this.apiURL}/all/${id}`);
  }

  getListStoreOrderBy(reqModelGetListStore): Observable<StoreViewModel[]> {
    let params = new HttpParams();
    params = params.append('IsAscending',reqModelGetListStore.isAscending);
    params = params.append('SortField',reqModelGetListStore.sortField);
    params = params.append('PageIndex',reqModelGetListStore.pageIndex);
    params = params.append('PageSize',reqModelGetListStore.pageSize);
    params = params.append('SearchString',reqModelGetListStore.searchString);
    return this._http.get<StoreViewModel[]>(this.apiURL, { params: params });
  }

  getNumberOfStoresWithSearchString(searchString): Observable<number> {
    return this._http.get<number>(`${this.apiURL}/number`, {params: {searchString: searchString}});
  }

  createStore(store): Observable<Store> {
    return this._http.post<Store>(`${this.apiURL}/create`, store);
  }

  getStore(id): Observable<Store> {
    return this._http.get<Store>(`${this.apiURL}/${id}`)
  }

  editStore(store) : Observable<Store> {
    return this._http.post<Store>(`${this.apiURL}/edit`, store);
  }

  deleteStore(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
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
