import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  apiURL: string = 'https://localhost:44392/api/unit';

  constructor(private _http: HttpClient) { }

  getAllUnits(): Observable<Unit[]> {
    return this._http.get<Unit[]>(this.apiURL);
  }

  getUnit(unitId): Observable<Unit> {
    return this._http.get<Unit>(`${this.apiURL}/${unitId}`);
  }

  createUnit(unit): Observable<Unit> {
    return this._http.post<Unit>(this.apiURL, unit);
  }

  updateUnit(unit) {
    return this._http.put(this.apiURL, unit);
  }

  deleteUnit(unitId) {
    return this._http.delete(`${this.apiURL}/${unitId}`);
  }

}


export class Unit {
  id: number;
  unitName: string;
  weight: number;
  slug: string;
  goodsCuttingType: number;
}
