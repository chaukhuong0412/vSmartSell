import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debug } from 'util';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {


   }

  getListUser(): Observable<User[]> {
    return this._http.get<User[]>('https://localhost:44305/api/user');
  }

  getListUserOrderBy(reqModelGetListUser): Observable<User[]> {
    if (reqModelGetListUser.searchString == "")
      console.log('https://localhost:44305/api/user/sort?IsAscending=' 
      + reqModelGetListUser.isAscending + '&SortField=' + reqModelGetListUser.sortField
      + '&PageIndex=' + reqModelGetListUser.pageIndex + '&PageSize=' + reqModelGetListUser.pageSize);
    else 
      console.log('https://localhost:44305/api/user/sort?IsAscending=' 
        + reqModelGetListUser.isAscending + '&SortField=' + reqModelGetListUser.sortField
        + '&PageIndex=' + reqModelGetListUser.pageIndex + '&PageSize=' + reqModelGetListUser.pageSize + '&SearchString=' + reqModelGetListUser.searchString);
    if (reqModelGetListUser.searchString == "")
      return this._http.get<User[]>('https://localhost:44305/api/user/sort?IsAscending=' 
      + reqModelGetListUser.isAscending + '&SortField=' + reqModelGetListUser.sortField
      + '&PageIndex=' + reqModelGetListUser.pageIndex + '&PageSize=' + reqModelGetListUser.pageSize);
    else 
      return this._http.get<User[]>('https://localhost:44305/api/user/sort?IsAscending=' 
        + reqModelGetListUser.isAscending + '&SortField=' + reqModelGetListUser.sortField
        + '&PageIndex=' + reqModelGetListUser.pageIndex + '&PageSize=' + reqModelGetListUser.pageSize + '&SearchString=' + reqModelGetListUser.searchString);
  }

  getUser(id): Observable<User> {
    return this._http.get<User>('https://localhost:44305/api/user/' + id)
  }

  getNumberOfUsers(): Observable<number> {
    return this._http.get<number>('https://localhost:44305/api/user/number')
  }

  getNumberOfUsersWithSearchString(searchString): Observable<number> {
    return this._http.get<number>('https://localhost:44305/api/user/number', {params: {searchString: searchString}});
  }

  createUser(user) : Observable<User> {
    return this._http.post<User>('https://localhost:44305/api/user/create', user);
  }

  editUser(user) : Observable<User> {
    return this._http.post<User>('https://localhost:44305/api/user/edit', user);
  }

  resetPassword(id) {
    return this._http.get('https://localhost:44305/api/user/resetpassword/' + id);
  }

  deleteUser(id) {
    return this._http.delete('https://localhost:44305/api/user/' + id);
  }

  activate(id) {
    return this._http.get('https://localhost:44305/api/user/activate/' + id);
  }

  deactivate(id) {
    return this._http.get('https://localhost:44305/api/user/deactivate/' + id)
  }

  setLimitation(number) {
    return this._http.post('https://localhost:44305/api/user/setlimitation', {params: {number: number}});
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