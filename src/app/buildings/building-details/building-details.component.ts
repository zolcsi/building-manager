import { Component } from '@angular/core';
import { Building } from '../../core/model/building';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.scss']
})
export class BuildingDetailsComponent {

  building: Building;

  constructor(private activatedRoute: ActivatedRoute) {
    this.building = this.activatedRoute.snapshot.data.building;
  }

  saveNicknames(nicknames: string[]): void {
    this.building.nicknames = nicknames;
    console.log('new nicknames: ', nicknames);
  }
}
