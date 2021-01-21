import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartialsModule } from '../../partials/partials.module';
import { UserManagementComponent } from './user-management.component';
import { UsersComponent } from './users/users.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { IconModule } from '@cms/partials';
import { RolesComponent } from './roles/roles.component';
import { RoleEditComponent } from './roles/role-edit/role-edit.component';

const routesChild: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full'
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'users/add',
        component: UserEditComponent
      },
      {
        path: 'users/:id',
        component: UserEditComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      },
      {
        path: 'roles/add',
        component: RoleEditComponent
      },
      {
        path: 'roles/:id',
        component: RoleEditComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    UserManagementComponent,
    UsersComponent,
    UserEditComponent,
    UserDetailComponent,
    RolesComponent,
    RoleEditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesChild),
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatSortModule,
    PartialsModule
  ]
})
export class UserManagementModule { }
