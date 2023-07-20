import { Routes } from '@angular/router';
import { BikeListComponent } from './bike-list/bike-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'bikes', pathMatch: 'full' },
  {
    path: 'bikes',
    component: BikeListComponent,
    // resolve: [RecipesResolver],
    children: [
      // { path: 'new', component: BikeEditComponent },
      // { path: ':id', component: BikeDetailComponent },
      {
        path: 'new',
        loadComponent: () => import('./bike-list/bike-edit/bike-edit.component').then(
          mod => mod.BikeEditComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./bike-list/bike-detail/bike-detail.component').then(
          m => m.BikeDetailComponent)
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./bike-list/bike-edit/bike-edit.component').then(
          mod => mod.BikeEditComponent)
      },
    ]
  },
  { path: '**', redirectTo: 'bikes' },
];
