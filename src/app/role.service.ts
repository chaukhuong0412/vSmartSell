import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permission } from './permission.service';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _http: HttpClient) {

  }

  getListRoles(): Observable<Role[]> {
    return this._http.get<Role[]>('https://localhost:44305/api/role');
  }

  getListRoleOrderBy(reqModelGetListRole): Observable<Role[]> {
    if (reqModelGetListRole.searchString == "")
      return this._http.get<Role[]>('https://localhost:44305/api/role/sort?IsAscending=' 
      + reqModelGetListRole.isAscending + '&SortField=' + reqModelGetListRole.sortField
      + '&PageIndex=' + reqModelGetListRole.pageIndex + '&PageSize=' + reqModelGetListRole.pageSize);
    else 
      return this._http.get<Role[]>('https://localhost:44305/api/role/sort?IsAscending=' 
        + reqModelGetListRole.isAscending + '&SortField=' + reqModelGetListRole.sortField
        + '&PageIndex=' + reqModelGetListRole.pageIndex + '&PageSize=' + reqModelGetListRole.pageSize + '&SearchString=' + reqModelGetListRole.searchString);
  }

  getNumberOfRolesWithSearchString(searchString): Observable<number> {
    return this._http.get<number>('https://localhost:44305/api/role/number', {params: {searchString: searchString}});
  }

  createRole(role): Observable<Role> {
    return this._http.post<Role>('https://localhost:44305/api/role/create', role);
  }

  getRole(id): Observable<Role> {
    return this._http.get<Role>('https://localhost:44305/api/role/' + id)
  }

  editRole(role) : Observable<Role> {
    return this._http.post<Role>('https://localhost:44305/api/role/edit', role);
  }

  deleteRole(id) {
    return this._http.delete('https://localhost:44305/api/role/' + id);
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
