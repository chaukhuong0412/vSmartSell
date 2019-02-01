import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debug } from 'util';
import { Observable } from 'rxjs';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  apiURL: string = Config.baseUserURL + '/api/permission';


  constructor(private _http: HttpClient) {

  }


  getListPermissions(): Observable<Permission[]> {
    return this._http.get<Permission[]>(this.apiURL);
  }

  getPermissionGroups() {
    return this._http.get(`${this.apiURL}/group`);
  }

  // createPermission(permission): Observable<Permission> {
  //   return this._http.post<Permission>('https://localhost:44305/api/permission/create', permission);
  // }

  // getPermission(id): Observable<Permission> {
  //   return this._http.get<Permission>('https://localhost:44305/api/Permission/' + id)
  // }

  // editPermission(permission) : Observable<Permission> {
  //   return this._http.post<Permission>('https://localhost:44305/api/permission/edit', permission);
  // }

  // deletePermission(id) {
  //   return this._http.delete('https://localhost:44305/api/permission/' + id);
  // }



}

export class Permission {
  id : string;
  display: string;
}
