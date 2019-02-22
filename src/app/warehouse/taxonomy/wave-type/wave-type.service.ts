import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class WaveTypeService {

  apiURL: string = Config.baseWarehouseURL + '/api/wave-type';

  constructor(private _http: HttpClient) { }

  getAllWaveTypes(): Observable<WaveType[]> {
    return this._http.get<WaveType[]>(`${this.apiURL}/all`);
  }

  getWaveType(waveTypeId): Observable<WaveType> {
    return this._http.get<WaveType>(`${this.apiURL}/${waveTypeId}`);
  }

  createWaveType(waveType): Observable<WaveType> {
    return this._http.post<WaveType>(this.apiURL, waveType);
  }

  updateWaveType(waveType) {
    return this._http.put(this.apiURL, waveType);
  }

  deleteWaveType(waveTypeId) {
    return this._http.delete(`${this.apiURL}/${waveTypeId}`);
  }

}


export class WaveType {
  id: number;
  waveTypeName: string;
  weight: number;
  slug: string;
  loss: number;
  lossAmount: number
}
