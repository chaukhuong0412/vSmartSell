import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string;

  constructor(private _http: HttpClient) { }

  logIn(logInBindingModel) : Observable<LogInResponseModel> {
    return this._http.post<LogInResponseModel>('https://localhost:44305/api/user/login', logInBindingModel);
  }



  isAuthenticated(): boolean {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser && currentUser.accessToken;
  }
  
}

export class LogInBindingModel {
  userName: string;
  password: string;
}

export class LogInResponseModel {
  id: number;
  userName: string;
  accessToken: string;
}

