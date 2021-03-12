import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

// Material Modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';

// Modules
import { FormModule, IconModule, PartialsModule } from '@cms/partials';


// Services
import { IRoleService, IUserService } from './services';
import { RoleService } from './services/role/role.service';
import { UserService } from './services/user/user.service';

// Components
import { UserManagementComponent } from './user-management.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { RolesComponent } from './roles/roles.component';
import { UpdateUserDataComponent } from './users/update-user-data/update-user-data.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateUserPasswordComponent } from './users/update-user-password/update-user-password.component';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { UpdateRoleDataComponent } from './roles/update-role-data/update-role-data.component';

import { userReducer } from './state/users.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/users.effects';
import { UserFormComponent } from './users/user-detail/user-form/user-form.component';
import { UserInfoComponent } from './users/user-detail/user-info/user-info.component';
import { UserChangepassFormComponent } from './users/user-detail/user-changepass-form/user-changepass-form.component';

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
        path: 'user-detail/:id',
        component: UserDetailComponent
      },
      {
        path: 'roles',
        component: RolesComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    UserManagementComponent,
    UsersComponent,
    UserDetailComponent,
    RolesComponent,
    UpdateUserDataComponent,
    CreateUserComponent,
    UpdateUserPasswordComponent,
    CreateRoleComponent,
    UpdateRoleDataComponent,
    UserFormComponent,
    UserInfoComponent,
    UserChangepassFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routesChild),
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
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
    FormModule,
    PartialsModule
  ],
    providers: [
      { provide: IRoleService, useClass: RoleService },
      { provide: IUserService, useClass: UserService }
    ]
})
export class UserManagementModule { }
