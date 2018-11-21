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

  getUser(id): Observable<User> {
    return this._http.get<User>('https://localhost:44305/api/user/' + id)
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
    return this._http.get('https://localhost:44305/api/user/activate/' + id)
  }

  deactivate(id) {
    return this._http.get('https://localhost:44305/api/user/deactivate/' + id)
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
  userId: Number;
  userName: string;
  password: string;
  fullName: string;
  userStatus: any;
  roleIds: Number[];
}

export class UserAudit {
  type: string;
  objectId: Number;
  user: string;
  changeOn: Date;
  data: object;
}
