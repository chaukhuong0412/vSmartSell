import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiURL: string = Config.baseUserURL + '/api/client';


  constructor(private _http: HttpClient) {
  }

  getClient(): Observable<Client> {
    return this._http.get<Client>(this.apiURL);
  }

  editClient(client) {
    return this._http.post(this.apiURL, client);
  }


}

export class Client {
  title: string;
  address: string;
  phoneNumber: string;
}
