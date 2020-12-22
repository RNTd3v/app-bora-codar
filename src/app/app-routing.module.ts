import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { BaseComponent } from './views/theme/base/base.component'
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./views/pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user-management',
        loadChildren: () =>
          import('./views/pages/user-management/user-management.module').then(
            (m) => m.UserManagementModule,
          ),
      },
      {
        path: '',
        redirectTo: 'user-management', // TODO: Trocar para Dashboard
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'user-management', // TODO: Trocar para Dashboard
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'error/403',
    pathMatch: 'full',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
