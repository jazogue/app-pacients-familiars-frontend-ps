import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddResourcesPage } from './add-resources.page';

const routes: Routes = [
  {
    path: '',
    component: AddResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddResourcesPageRoutingModule {}
