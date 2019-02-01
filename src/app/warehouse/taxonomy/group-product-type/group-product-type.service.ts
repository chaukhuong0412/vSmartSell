import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Unit } from '../unit/unit.service';
import { WaveType } from '../wave-type/wave-type.service';
import { Config } from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class GroupProductTypeService {
  apiURL: string = Config.baseWarehouseURL + '/api/group-product-type';

  constructor(private _http: HttpClient) { }

  getAllGroupProductTypes(): Observable<GroupProductType[]> {
    return this._http.get<GroupProductType[]>(`${this.apiURL}/all`);
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
