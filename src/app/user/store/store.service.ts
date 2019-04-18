import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  apiURL: string = Config.baseUserURL + '/api/store';

  constructor(private _http: HttpClient) {
  }

  getListStores(): Observable<Store[]> {
    return this._http.get<Store[]>(`${this.apiURL}/all`);
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
    return this._http.post<Store>(this.apiURL, store);
  }

  getStore(id): Observable<Store> {
    return this._http.get<Store>(`${this.apiURL}/${id}`)
  }

  editStore(store) : Observable<Store> {
    return this._http.put<Store>(this.apiURL, store);
  }

  deleteStore(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

}

export class Store {
  id : number;
  title : string;
  storeCode: string;
  phoneNumber: string;
  address: string;
  companyId : number;
}

export class StoreViewModel {
  id : number;
  title : string;
  companyName : string;
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
