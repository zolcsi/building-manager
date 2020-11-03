import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {
  EMPTY,
  Observable,
  of
} from 'rxjs';
import { Building } from '../model/building';
import { BuildingsService } from '../service/buildings.service';
import {
  map,
  mergeMap,
  take
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuildingResolver implements Resolve<Building> {

  constructor(private buildingsService: BuildingsService,
              private router: Router) {
  }

  resolve(activatedRouteSnapshot: ActivatedRouteSnapshot,
          routerStateSnapshot: RouterStateSnapshot): Observable<Building> {

    const buildingId = activatedRouteSnapshot.params.buildingId;
    return this.buildingsService.getBuildings()
      .pipe(
        take(1),
        map((buildings: Building[]) => buildings.find((building: Building) => building.id === buildingId)),
        mergeMap((building) => {
          if (building) {
            return of(building);
          } else {
            this.router.navigate(['/']);
            return EMPTY;
          }
        })
      );
  }
}
