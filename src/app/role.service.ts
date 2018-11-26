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
  permissionIds: number[];
}
