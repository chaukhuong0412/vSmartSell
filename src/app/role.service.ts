import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from './permission.service';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  apiURL: string = 'https://localhost:44305/api/role';


  constructor(private _http: HttpClient) {

  }

  getListRoles(): Observable<Role[]> {
    return this._http.get<Role[]>(this.apiURL);
  }

  getListRoleOrderBy(reqModelGetListRole): Observable<Role[]> {
    let params = new HttpParams();
    params = params.append('IsAscending',reqModelGetListRole.isAscending);
    params = params.append('SortField',reqModelGetListRole.sortField);
    params = params.append('PageIndex',reqModelGetListRole.pageIndex);
    params = params.append('PageSize',reqModelGetListRole.pageSize);
    params = params.append('SearchString',reqModelGetListRole.searchString);
    return this._http.get<Role[]>(this.apiURL, { params: params });
  }

  getNumberOfRolesWithSearchString(searchString): Observable<number> {
    return this._http.get<number>(`${this.apiURL}/number`, {params: {searchString: searchString}});
  }

  createRole(role): Observable<Role> {
    return this._http.post<Role>(`${this.apiURL}/create`, role);
  }

  getRole(id): Observable<Role> {
    return this._http.get<Role>(`${this.apiURL}/${id}`)
  }

  editRole(role) : Observable<Role> {
    return this._http.post<Role>(`${this.apiURL}/edit`, role);
  }

  deleteRole(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

}


export class Role {
  id : number;
  name : string;
  permissionIds: string[];
}


export class ReqModelGetListRole {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
}

export enum ESortField {
  Name
}
