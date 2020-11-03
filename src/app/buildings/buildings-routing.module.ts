import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingsComponent } from './buildings.component';
import { BuildingDetailsComponent } from './building-details/building-details.component';
import { BuildingResolver } from '../core/resolver/building.resolver';


const routes: Routes = [
  {
    path: '',
    component: BuildingsComponent
  },
  {
    path: ':buildingId/details',
    component: BuildingDetailsComponent,
    resolve: {
      building: BuildingResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingsRoutingModule { }
