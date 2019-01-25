import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WaveTypeService {

  apiURL: string = 'https://localhost:44392/api/waveType';

  constructor(private _http: HttpClient) { }

  getAllWaveTypes(): Observable<WaveType[]> {
    return this._http.get<WaveType[]>(this.apiURL);
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
