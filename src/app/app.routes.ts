import { Routes } from '@angular/router';
import { BikeListComponent } from './bike-list/bike-list.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { canDeactivateGuard } from './bike-list/bike-edit/can-deactivate.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'bikes', pathMatch: 'full' },
  {
    path: 'bikes',
    component: BikeListComponent,
    canActivate: [AuthGuard],
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
          mod => mod.BikeEditComponent),
          canDeactivate: [canDeactivateGuard]
      }
    ]
  },
  // { path: 'auth', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', redirectTo: 'bikes' },
];
