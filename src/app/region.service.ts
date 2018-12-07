import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  constructor(private _http: HttpClient) {
  }

  getListRegions(): Observable<Region[]> {
    return this._http.get<Region[]>('https://localhost:44305/api/Region');
  }

  getListRegionsExcept(id): Observable<Region[]> {
    return this._http.get<Region[]>('https://localhost:44305/api/Region/all/' + id);
  }

  getListRegionOrderBy(reqModelGetListRegion): Observable<RegionViewModel[]> {
    if (reqModelGetListRegion.searchString == "")
      return this._http.get<RegionViewModel[]>('https://localhost:44305/api/Region/sort?IsAscending=' 
      + reqModelGetListRegion.isAscending + '&SortField=' + reqModelGetListRegion.sortField
      + '&PageIndex=' + reqModelGetListRegion.pageIndex + '&PageSize=' + reqModelGetListRegion.pageSize);
    else 
      return this._http.get<RegionViewModel[]>('https://localhost:44305/api/Region/sort?IsAscending=' 
        + reqModelGetListRegion.isAscending + '&SortField=' + reqModelGetListRegion.sortField
        + '&PageIndex=' + reqModelGetListRegion.pageIndex + '&PageSize=' + reqModelGetListRegion.pageSize + '&SearchString=' + reqModelGetListRegion.searchString);
  }

  getNumberOfRegionsWithSearchString(searchString): Observable<number> {
    return this._http.get<number>('https://localhost:44305/api/Region/number', {params: {searchString: searchString}});
  }

  createRegion(region): Observable<Region> {
    return this._http.post<Region>('https://localhost:44305/api/Region/create', region);
  }

  getRegion(id): Observable<Region> {
    return this._http.get<Region>('https://localhost:44305/api/Region/' + id)
  }

  editRegion(region) : Observable<Region> {
    return this._http.post<Region>('https://localhost:44305/api/Region/edit', region);
  }

  deleteRegion(id) {
    return this._http.delete('https://localhost:44305/api/Region/' + id);
  }
}

export class Region {
  id : number;
  name : string;
  companyId : number;
  storeIds: number[];
}

export class RegionViewModel {
  id : number;
  name : string;
  companyName : string;
}


export class ReqModelGetListRegion {
  sortField: ESortField;
  isAscending: boolean;
  pageSize: number;
  pageIndex: number;
  searchString: string;
}

export enum ESortField {
  Name
}