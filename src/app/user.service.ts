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

  createUser(user) : Observable<User> {
    return this._http.post<User>('https://localhost:44305/api/user/create', user);
  }
}

export class User{
  userId: Number;
  userName: string;
}
