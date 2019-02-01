import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class StoreConfigService {

  apiURL: string = Config.baseUserURL + '/api/config';

  constructor(private _http: HttpClient) {
  }

  getStoreConfigOfStore(id) : Observable<StoreConfig[]> {
    return this._http.get<StoreConfig[]>(`${this.apiURL}/store/${id}`);
  }

  getStoreConfig(id) : Observable<StoreConfig> {
    return this._http.get<StoreConfig>(`${this.apiURL}/${id}`);
  }

  deleteStoreConfig(id) {
    return this._http.delete(`${this.apiURL}/${id}`);
  }

  editStoreConfig(config) {
    return this._http.put(this.apiURL, config)
  }

  createStoreConfig(config) {
    return this._http.post(this.apiURL, config);
  }
}


export class StoreConfig {
  id: number;
  key: string;
  value: string;
  description: string;
  storeId: number;
}