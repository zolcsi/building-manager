import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from '../model/building';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  private readonly BUILDINGS_REPO = 'assets/buildings_repo.json';

  constructor(private httpClient: HttpClient) {
  }

  getBuildings(): Observable<Building[]> {
    return this.httpClient.get<Building[]>(this.BUILDINGS_REPO);
  }
}
