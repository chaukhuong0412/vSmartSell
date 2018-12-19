import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debug } from 'util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private _http: HttpClient) {

  }


  getListPermissions(): Observable<Permission[]> {
    return this._http.get<Permission[]>('https://localhost:44305/api/permission');
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
