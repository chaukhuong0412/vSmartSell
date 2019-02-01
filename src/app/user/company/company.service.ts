import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiURL: string = Config.baseUserURL + '/api/company';


  constructor(private _http: HttpClient) {
  }

  getListCompanys(): Observable<Company[]> {
    return this._http.get<Company[]>(`${this.apiURL}/all`);
  }

  getListCompanyManagedBy(userName) : Observable<Company[]> {
    return this._http.get<Company[]>(`${this.apiURL}/managedby/${userName}`);
  }

  getListCompanysExcept(id): Observable<Company[]> {
    return this._http.get<Company[]>(`${this.apiURL}/all/${id}`);
  }

  getListCompanyOrderBy(reqModelGetListCompany): Observable<CompanyViewModel[]> {
    let params = new HttpParams();
    params = params.append('IsAscending',reqModelGetListCompany.isAscending);
    params = params.append('SortField',reqModelGetListCompany.sortField);
    params = params.append('PageIndex',reqModelGetListCompany.pageIndex);
    params = params.append('PageSize',reqModelGetListCompany.pageSize);
    params = params.append('SearchString',reqModelGetListCompany.searchString);
    return this._http.get<Company[]>(this.apiURL, { params: params });
  }

  getNumberOfCompanysWithSearchString(searchString): Observable<number> {
    return this._http.get<number>(`${this.apiURL}/number`, {params: {searchString: searchString}});
  }

  createCompany(company): Observable<Company> {
    return this._http.post<Company>(this.apiURL, company);
  }

  getCompany(id): Observable<Company> {
    return this._http.get<Company>(`${this.apiURL}/${id}`)
  }

  editCompany(company) : Observable<Company> {
    return this._http.put<Company>(this.apiURL, company);
  }

  deleteCompany(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }
}

export class Company {
  id : number;
  name : string;
  address: string;
  phoneNumber: string;
  numberOfAccountAllowed: number;
  // regionIds: number[];
}

export class CompanyViewModel {
  id : number;
  name : string;
  address: string;
  phoneNumber: string;
  numberOfAccountAllowed: number;
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
