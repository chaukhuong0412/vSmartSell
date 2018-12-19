import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private _http: HttpClient) {
  }

  getClient(): Observable<Client> {
    return this._http.get<Client>('https://localhost:44305/api/client/');
  }

  editClient(client) {
    return this._http.post('https://localhost:44305/api/client/', client);
  }


}

export class Client {
  name: string;
  address: string;
  phoneNumber: string;
}
