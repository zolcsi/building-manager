import { TestBed } from '@angular/core/testing';

import { BuildingResolver } from './building.resolver';
import { BuildingsService } from '../service/buildings.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Building } from '../model/building';

describe('BuildingResolver', () => {
  let buildingResolver: BuildingResolver;
  let buildingsServiceSpy: BuildingsService;
  let routerSpy: Router;
  const expectedBuilding: Building = {
    id: 'TEST008',
    address: 'Car. de l\'Almirall Aixada, 22, Barcelona',
    description: 'Swimming & lounging haunt with many services, including a lifeguard.',
    nicknames: ['surfhouse']
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: BuildingsService, useValue: jasmine.createSpyObj('BuildingsService', ['getBuildings'])},
        {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}
      ]
    });
    buildingResolver = TestBed.inject(BuildingResolver);
    buildingsServiceSpy = TestBed.inject(BuildingsService);
    routerSpy = TestBed.inject(Router);
  });


  // BASIC CHECK
  it('should create the necessary services', () => {
    expect(buildingResolver).toBeTruthy();
    expect(buildingsServiceSpy).toBeTruthy();
    expect(routerSpy).toBeTruthy();
  });


  // HAPPY CASE
  it('should find the building with the provided ID, fetch then return it', () => {

    // Spy On buildingsService
    (buildingsServiceSpy.getBuildings as jasmine.Spy).and.returnValue(of([expectedBuilding]));

    // Spy On activatedRouteSnapshot
    const activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['params.buildingId']);
    activatedRouteSnapshotSpy.params = {
      buildingId: 'TEST008'
    };

    // Spy On routerStateSnapshot
    const routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

    // Action
    buildingResolver.resolve(activatedRouteSnapshotSpy, routerStateSnapshotSpy).subscribe(
      (building: Building) => expect(building).toEqual(expectedBuilding, 'expected building'),
      fail
    );
    expect((buildingsServiceSpy.getBuildings as jasmine.Spy).calls.count()).toBe(1, 'one call');
  });


  // FAILING CASE
  it('should not find the building as the provided ID is wrong, navigate away', (done) => {

    // Spy On buildingsService
    (buildingsServiceSpy.getBuildings as jasmine.Spy).and.returnValue(of([expectedBuilding]));

    // Spy On activatedRouteSnapshot
    const activatedRouteSnapshotSpy = jasmine.createSpyObj('ActivatedRouteSnapshot', ['params.buildingId']);
    activatedRouteSnapshotSpy.params = {
      buildingId: 'TEST_INVALID_ID'
    };

    // Spy On routerStateSnapshot
    const routerStateSnapshotSpy = jasmine.createSpyObj('RouterStateSnapshot', ['toString']);

    // Spy On router
    (routerSpy.navigate as jasmine.Spy).and.returnValue(of('/'));

    // Action
    buildingResolver.resolve(activatedRouteSnapshotSpy, routerStateSnapshotSpy).subscribe(
      fail, fail, done
    );
    expect((buildingsServiceSpy.getBuildings as jasmine.Spy).calls.count()).toBe(1, 'one buildingsServiceSpy call');
    expect((routerSpy.navigate as jasmine.Spy).calls.count()).toBe(1, 'one routerSpy call');
    expect(routerSpy.navigate as jasmine.Spy).toHaveBeenCalledWith(['/']);
  });
});
