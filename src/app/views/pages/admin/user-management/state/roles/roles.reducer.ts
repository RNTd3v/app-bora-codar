import { createReducer, on } from "@ngrx/store";
import { Menu, Role} from '@cms/core';
import * as AppState from '../../../../../theme/state/app.reducer';
import {
  paginateRolesRequested, paginateRolesSucceeded, paginateRolesFailed,
  showRoleRequested, showRoleSucceeded, showRoleFailed, createRoleRequested,
  createRoleSucceeded, createRoleFailed, updateRoleRequested, updateRoleSucceeded,
  updateRoleFailed, deleteRoleRequested, deleteRoleSucceeded, deleteRoleFailed, paginateRolesCleared, linkRoleWithMenusRequested, linkRoleWithMenusFailed, linkRoleWithMenusSucceeded, menuShowByRoleRequested, menuShowByRoleSucceeded, menuShowByRoleFailed, updateRoleMenus } from "./roles.actions";

export interface State extends AppState.State {
  roles: RoleState;
}
export interface RoleState {
  roles: Role[];
  role: Role;
  roleId: string | null;
  roleMenus: Menu[] | null;
  error: any;
}

const initialState = {
  roles: [],
  role: undefined,
  roleId: null,
  roleMenus: null,
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
  on(createRoleSucceeded, (state, { roleId }) => ({...state, roleId })),
  on(createRoleFailed, (state, { error }) => ({...state, error })),

  // Update
  on(updateRoleRequested, (state, { role }) => ({...state, role })),
  on(updateRoleSucceeded, (state) => state),
  on(updateRoleFailed, (state, { error }) => ({...state, error })),
  on(updateRoleMenus, (state, { roleMenusPermissions }) => ({
    ...state,
    roleMenus: [...updateRoleMenusState(state.roleMenus, roleMenusPermissions)]
  })),

  // Delete
  on(deleteRoleRequested, (state) => state),
  on(deleteRoleSucceeded, (state, { roleId }) => ({
    ...state,
    roles: state.roles?.filter(role => role.id !== roleId) || state.roles
  })),
  on(deleteRoleFailed, (state, { error }) => ({...state, error })),

  // Show menus by role
  on(menuShowByRoleRequested, (state) => state),
  on(menuShowByRoleSucceeded, (state, { roleMenus }) => ({...state, roleMenus })),
  on(menuShowByRoleFailed, (state, { error }) => ({...state, error })),

  // Link with menus
  on(linkRoleWithMenusRequested, (state) => state),
  on(linkRoleWithMenusSucceeded, (state) => state),
  on(linkRoleWithMenusFailed, (state, { error }) => ({...state, error })),

);

const updateRoleMenusState = (roleMenus, roleMenusPermissions): Menu[] => {

  const { menuIndex, value, submenuIndex, actionIndex } = roleMenusPermissions;

  if (roleMenusPermissions.hasOwnProperty('actionIndex')) {
    return [ ... updateRoleActionState(roleMenus, submenuIndex, actionIndex, value) ]
  }

  if (roleMenusPermissions.hasOwnProperty('submenuIndex')) {
    return [ ... updateRoleSubmenusState(roleMenus, submenuIndex, value) ]
  }

  const newRoleMenus = roleMenus.map((role, index) => {
    if (index === menuIndex) {
      role = {...role, hasPermission: value }
    }
    return role
  })

  return [ ...newRoleMenus ]
}

const updateRoleActionState = (roleMenus, submenuIndex, actionIndex, value): Menu[] => {

  const newRoleAction = roleMenus.map(menu => {
    return { ...menu, childrens: [ ...menu.childrens.map((submenu, subIndex) => {
      return {
        ...submenu, childrens: [ ...submenu.childrens.map((action, index) => {
          if (subIndex === submenuIndex && index === actionIndex) {
            action = {...action, hasPermission: value }
          }
          return action
        })]
      }
    })]}
  })

  return [ ...newRoleAction ]
}

const updateRoleSubmenusState = (roleMenus, submenuIndex, value ): Menu[] => {

  const newRoleSubmenus = roleMenus.map(menu => {
    return { ...menu, childrens: [ ...menu.childrens.map((submenu, index) => {
      if (index === submenuIndex) {
        submenu = {...submenu, hasPermission: value }
      }
      return submenu
    })]}
  })

  return [ ...newRoleSubmenus ]

}


