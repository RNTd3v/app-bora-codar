import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: UsersComponent,
    pathMatch: 'full',
  },
  {
    path: 'users/add',
    component: UserEditComponent
  },
  {
    path: 'users/:id',
    component: UserEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
