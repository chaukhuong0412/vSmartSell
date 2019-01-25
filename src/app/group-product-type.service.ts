import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit } from './unit.service';
import { WaveType } from './wave-type.service';

@Injectable({
  providedIn: 'root'
})
export class GroupProductTypeService {
  apiURL: string = 'https://localhost:44392/api/groupProductType';

  constructor(private _http: HttpClient) { }

  getAllGroupProductTypes(): Observable<GroupProductType[]> {
    return this._http.get<GroupProductType[]>(this.apiURL);
  }

  getGroupProductType(groupProductTypeId): Observable<GroupProductType> {
    return this._http.get<GroupProductType>(`${this.apiURL}/${groupProductTypeId}`);
  }

  createGroupProductType(groupProductType): Observable<GroupProductType> {
    return this._http.post<GroupProductType>(this.apiURL, groupProductType);
  }

  updateGroupProductType(groupProductType) {
    return this._http.put(this.apiURL, groupProductType);
  }

  deleteGroupProductType(groupProductTypeId) {
    return this._http.delete(`${this.apiURL}/${groupProductTypeId}`);
  }

  getUnitsOfGroupProductType(groupProductTypeId): Observable<Unit[]> {
    return this._http.get<Unit[]>(`${this.apiURL}/${groupProductTypeId}/units`);
  }

  getWaveTypesOfGroupProductType(groupProductTypeId): Observable<WaveType[]> {
    return this._http.get<WaveType[]>(`${this.apiURL}/${groupProductTypeId}/waveTypes`);
  }

  

}


export class GroupProductType {
  id: number;
  groupProductTypeName: string;
  weight: number;
  slug: string;
  unitIds: number[];
  waveTypeIds: number[];
}
