import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {
  Observable,
  of
} from 'rxjs';
import { Building } from '../../core/model/building';

@Component({
  selector: 'app-building-list',
  templateUrl: './building-list.component.html',
  styleUrls: ['./building-list.component.scss']
})
export class BuildingListComponent {

  @Input() buildings$: Observable<Building[]> = of([]);
  @Output() buildingSelected: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  selectBuilding(buildingId: string): void {
    this.buildingSelected.emit(buildingId);
  }
}
