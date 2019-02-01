import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = Config.baseUserURL + '/api/auth';

  token: string;

  constructor(private _http: HttpClient) { }

  logIn(logInBindingModel) : Observable<LogInResponseModel> {
    return this._http.post<LogInResponseModel>(`${this.apiURL}/login`, logInBindingModel);
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

