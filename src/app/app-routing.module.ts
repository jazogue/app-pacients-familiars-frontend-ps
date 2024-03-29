import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'add-patient',
    loadChildren: () =>
      import('./add-patient/add-patient.module').then(
        (m) => m.AddPatientPageModule
      ),
  },
  {
    path: 'patient-info',
    loadChildren: () =>
      import('./patient-info/patient-info.module').then(
        (m) => m.PatientInfoPageModule
      ),
  },
  {
    path: 'add-resources',
    loadChildren: () =>
      import('./add-resources/add-resources.module').then(
        (m) => m.AddResourcesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
