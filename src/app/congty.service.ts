import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CongtyService {

  constructor(private _http: HttpClient) {
  }

  getListCongTys(): Observable<Company[]> {
    return this._http.get<Company[]>('https://localhost:44305/api/Company');
  }

  getListCongTysExcept(id): Observable<Company[]> {
    return this._http.get<Company[]>('https://localhost:44305/api/Company/all/' + id);
  }

  getListCongTyOrderBy(reqModelGetListCongTy): Observable<CompanyViewModel[]> {
    if (reqModelGetListCongTy.searchString == "")
      return this._http.get<CompanyViewModel[]>('https://localhost:44305/api/Company/sort?IsAscending=' 
      + reqModelGetListCongTy.isAscending + '&SortField=' + reqModelGetListCongTy.sortField
      + '&PageIndex=' + reqModelGetListCongTy.pageIndex + '&PageSize=' + reqModelGetListCongTy.pageSize);
    else 
      return this._http.get<CompanyViewModel[]>('https://localhost:44305/api/Company/sort?IsAscending=' 
        + reqModelGetListCongTy.isAscending + '&SortField=' + reqModelGetListCongTy.sortField
        + '&PageIndex=' + reqModelGetListCongTy.pageIndex + '&PageSize=' + reqModelGetListCongTy.pageSize + '&SearchString=' + reqModelGetListCongTy.searchString);
  }

  getNumberOfCongTysWithSearchString(searchString): Observable<number> {
    return this._http.get<number>('https://localhost:44305/api/Company/number', {params: {searchString: searchString}});
  }

  createCongTy(congty): Observable<Company> {
    return this._http.post<Company>('https://localhost:44305/api/Company/create', congty);
  }

  getCongTy(id): Observable<Company> {
    return this._http.get<Company>('https://localhost:44305/api/Company/' + id)
  }

  editCongTy(congty) : Observable<Company> {
    return this._http.post<Company>('https://localhost:44305/api/Company/edit', congty);
  }

  deleteCongTy(id) {
    return this._http.delete('https://localhost:44305/api/Company/' + id);
  }
}

export class Company {
  id : number;
  name : string;
  parentCompanyId : number;
  daughterCompanyIds: number[];
  // regionIds: number[];
}

export class CompanyViewModel {
  id : number;
  name : string;
  parentCompanyName : string;
}


export class ReqModelGetListCompany {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
}

export enum ESortField {
  Name
}
