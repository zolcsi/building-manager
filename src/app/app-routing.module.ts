import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'buildings',
    loadChildren: () => import('./buildings/buildings.module').then(m => m.BuildingsModule)
  },
  {
    path: '**',
    redirectTo: 'buildings',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
