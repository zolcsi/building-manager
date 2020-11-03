import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildingsRoutingModule } from './buildings-routing.module';
import { BuildingsComponent } from './buildings.component';
import { BuildingDetailsComponent } from './building-details/building-details.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    BuildingsComponent,
    BuildingDetailsComponent
  ],
  imports: [
    CommonModule,
    BuildingsRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
  ]
})
export class BuildingsModule {
}
