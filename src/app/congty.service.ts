import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongtyService {

  constructor(private _http: HttpClient) {
  }

  getListCongTys(): Observable<CongTy[]> {
    return this._http.get<CongTy[]>('https://localhost:44305/api/CongTy');
  }

  getListCongTysExcept(id): Observable<CongTy[]> {
    return this._http.get<CongTy[]>('https://localhost:44305/api/CongTy/all/' + id);
  }

  getListCongTyOrderBy(reqModelGetListCongTy): Observable<CongTyViewModel[]> {
    if (reqModelGetListCongTy.searchString == "")
      return this._http.get<CongTyViewModel[]>('https://localhost:44305/api/congty/sort?IsAscending=' 
      + reqModelGetListCongTy.isAscending + '&SortField=' + reqModelGetListCongTy.sortField
      + '&PageIndex=' + reqModelGetListCongTy.pageIndex + '&PageSize=' + reqModelGetListCongTy.pageSize);
    else 
      return this._http.get<CongTyViewModel[]>('https://localhost:44305/api/congty/sort?IsAscending=' 
        + reqModelGetListCongTy.isAscending + '&SortField=' + reqModelGetListCongTy.sortField
        + '&PageIndex=' + reqModelGetListCongTy.pageIndex + '&PageSize=' + reqModelGetListCongTy.pageSize + '&SearchString=' + reqModelGetListCongTy.searchString);
  }

  getNumberOfCongTysWithSearchString(searchString): Observable<number> {
    return this._http.get<number>('https://localhost:44305/api/congty/number', {params: {searchString: searchString}});
  }

  createCongTy(congty): Observable<CongTy> {
    return this._http.post<CongTy>('https://localhost:44305/api/congty/create', congty);
  }

  getCongTy(id): Observable<CongTy> {
    return this._http.get<CongTy>('https://localhost:44305/api/congty/' + id)
  }

  editCongTy(congty) : Observable<CongTy> {
    return this._http.post<CongTy>('https://localhost:44305/api/congty/edit', congty);
  }

  deleteCongTy(id) {
    return this._http.delete('https://localhost:44305/api/congty/' + id);
  }
}

export class CongTy {
  id : number;
  tenCongTy : string;
  congTyChaId : number;
  congTyConIds: number[];
  cuaHangIds: number[];
}

export class CongTyViewModel {
  id : number;
  tenCongTy : string;
  tenCongTyCha : string;
}


export class ReqModelGetListCongTy {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
}

export enum ESortField {
  Name
}
