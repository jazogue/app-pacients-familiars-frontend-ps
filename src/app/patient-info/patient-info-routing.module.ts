import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientInfoPage } from './patient-info.page';

const routes: Routes = [
  {
    path: '',
    component: PatientInfoPage
  },
  {
    path: 'states',
    loadChildren: () => import('./states/states.module').then( m => m.StatesPageModule)
  },
  {
    path: 'modify',
    loadChildren: () => import('./modify/modify.module').then( m => m.ModifyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientInfoPageRoutingModule {}
