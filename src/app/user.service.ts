import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { debug } from 'util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL: string = 'https://localhost:44305/api/user';

  constructor(private _http: HttpClient) {
  }

  getListUser(): Observable<User[]> {
    return this._http.get<User[]>(this.apiURL);
  }

  getListUserOrderBy(reqModelGetListUser): Observable<User[]> {
    let params = new HttpParams();
    params = params.append('IsAscending',reqModelGetListUser.isAscending);
    params = params.append('SortField',reqModelGetListUser.sortField);
    params = params.append('PageIndex',reqModelGetListUser.pageIndex);
    params = params.append('PageSize',reqModelGetListUser.pageSize);
    params = params.append('SearchString',reqModelGetListUser.searchString);
    return this._http.get<User[]>(this.apiURL, { params: params });
  }

  getUser(id): Observable<User> {
    return this._http.get<User>(`${this.apiURL}/${id}`)
  }

  getNumberOfUsers(): Observable<number> {
    return this._http.get<number>(`${this.apiURL}/number`)
  }

  getNumberOfUsersWithSearchString(searchString): Observable<number> {
    return this._http.get<number>(`${this.apiURL}/number`, {params: {searchString: searchString}});
  }

  createUser(user) : Observable<User> {
    return this._http.post<User>(`${this.apiURL}/create`, user);
  }

  editUser(user) : Observable<User> {
    return this._http.post<User>(`${this.apiURL}/edit`, user);
  }

  resetPassword(id) {
    
    return this._http.get(`${this.apiURL}/resetpassword/${id}`);
  }

  deleteUser(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  activate(id) {
    return this._http.get(`${this.apiURL}/activate/${id}`);
  }

  deactivate(id) {
    return this._http.get(`${this.apiURL}/deactivate/${id}`)
  }

  setLimitation(number) {
    return this._http.post(`${this.apiURL}/setlimitation`, {params: {number: number}});
  }


  // addAudit(user) {
  //   var userAudit = {
  //     type: "user",
  //     objectId: user.Id,
  //     user: "admin",
  //     changeOn: Date().toLocaleLowerCase(),
  //     data: {
  //       userName: user.UserName,
  //       password: user.Password,
  //       roleIds: user.RoleIds
  //     }
  //   };
  //   console.log(userAudit);
  //   return this._http.post('https://localhost:44345/api/audit', userAudit);
  // }
}

export class User {
  userId: number;
  userName: string;
  password: string;
  fullName: string;
  userStatus: any;
  roleIds: number[];
  companyId: number;
  storeId: number;
  storeIds: number[];
  companyIds: number[];
  companyName: string;
  storeName: string;
  createdAt: any;
  importWarehouseIds: number[];
  sellWarehouseIds: number[];
}

export class UserAudit {
  type: string;
  objectId: number;
  user: string;
  changeOn: Date;
  data: object;
}

export class ReqModelGetListUser {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
}

export enum ESortField {
  UserName,
  FullName,
  CuaHang,
  CreateAt
}