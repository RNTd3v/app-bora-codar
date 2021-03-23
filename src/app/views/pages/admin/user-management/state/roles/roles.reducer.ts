import { createReducer, on } from "@ngrx/store";
import { Role} from '@cms/core';
import * as AppState from '../../../../../theme/state/app.reducer';
import {
  paginateRolesRequested, paginateRolesSucceeded, paginateRolesFailed,
  showRoleRequested, showRoleSucceeded, showRoleFailed, createRoleRequested,
  createRoleSucceeded, createRoleFailed, updateRoleRequested, updateRoleSucceeded,
  updateRoleFailed, deleteRoleRequested, deleteRoleSucceeded, deleteRoleFailed, paginateRolesCleared, linkRoleWithMenusRequested, linkRoleWithMenusFailed, linkRoleWithMenusSucceeded } from "./roles.actions";

export interface State extends AppState.State {
  roles: RoleState;
}
export interface RoleState {
  roles: Role[];
  role: Role;
  error: any;
}

const initialState = {
  roles: [],
  role: undefined,
  error: ''
} as RoleState;

export const roleReducer = createReducer<RoleState>(

  initialState,

  // Paginate
  on(paginateRolesRequested, (state) => state),
  on(paginateRolesSucceeded, (state, { roles }) => ({...state, roles })),
  on(paginateRolesFailed, (state, { error }) => ({...state, error })),
  on(paginateRolesCleared, (state) => ({...state, roles: [] })),

  // Show
  on(showRoleRequested, (state) => state),
  on(showRoleSucceeded, (state, { role }) => ({...state, role })),
  on(showRoleFailed, (state, { error }) => ({...state, error })),

  // Create
  on(createRoleRequested, (state, { role }) => ({...state, role })),
  on(createRoleSucceeded, (state) => state),
  on(createRoleFailed, (state, { error }) => ({...state, error })),

  // Update
  on(updateRoleRequested, (state, { role }) => ({...state, role })),
  on(updateRoleSucceeded, (state) => state),
  on(updateRoleFailed, (state, { error }) => ({...state, error })),

  // Delete
  on(deleteRoleRequested, (state) => state),
  on(deleteRoleSucceeded, (state, { roleId }) => ({
    ...state,
    roles: state.roles?.filter(role => role.id !== roleId) || state.roles
  })),
  on(deleteRoleFailed, (state, { error }) => ({...state, error })),

  // Link with menus
  on(linkRoleWithMenusRequested, (state) => state),
  on(linkRoleWithMenusSucceeded, (state) => state),
  on(linkRoleWithMenusFailed, (state, { error }) => ({...state, error })),

);
