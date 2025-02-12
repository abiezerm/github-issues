import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'issues', loadComponent: () => import('./issues/pages/issue-list-page.component'), },
  { path: 'issues/:id', loadComponent: () => import('./issues/pages/issue-page.component'), },
  { path: '**', redirectTo: '/issues', },
];
