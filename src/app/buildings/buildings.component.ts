import { Component, OnInit } from '@angular/core';
import { BuildingsService } from '../core/service/buildings.service';
import {
  Observable,
  of
} from 'rxjs';
import { Building } from '../core/model/building';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {

  buildings$: Observable<Building[]> = of([]);

  constructor(private buildingsService: BuildingsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.buildings$ = this.buildingsService.getBuildings();
  }

  navigateToBuilding(buildingId: string): void {
    this.router.navigate(['buildings', buildingId, 'details']);
  }
}
