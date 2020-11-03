import { TestBed } from '@angular/core/testing';

import { BuildingsService } from './buildings.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Building } from '../model/building';

describe('BuildingsService', () => {
  let buildingsService: BuildingsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  const expectedBuildings: Building[] = [
    {
      id: 'TEST007',
      address: 'Via della Salara Vecchia, Roma, Italy',
      description: 'Vast excavated area of Roman temples, squares & government buildings',
      nicknames: ['parcocolosseo']
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', ['get']) }
      ]
    });
    buildingsService = TestBed.inject(BuildingsService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  // BASIC CHECK
  it('should create the necessary services', () => {
    expect(buildingsService).toBeTruthy();
    expect(httpClientSpy).toBeTruthy();
  });

  // RETRIEVE BUILDINGS
  it('should return the expected buildings', () => {
    httpClientSpy.get.and.returnValue(of(expectedBuildings));
    buildingsService.getBuildings().subscribe(
      (buildings: Building[]) => expect(buildings).toEqual(expectedBuildings, 'expected buildings'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
