import { createAction, props } from '@ngrx/store';
import { LinkMenus, Menu, Role, RoleMenusPermissions } from '@cms/core';

import * as constants from './roles.constants';

export const paginateRolesRequested = createAction(constants.PAGINATE_ROLES_REQUESTED);
export const paginateRolesSucceeded = createAction(constants.PAGINATE_ROLES_SUCCEEDED, props<{ roles: Role[] }>());
export const paginateRolesFailed = createAction(constants.PAGINATE_ROLES_FAILED, props<{ error: string }>());
export const paginateRolesCleared = createAction(constants.PAGINATE_ROLES_CLEARED);

export const showRoleRequested = createAction(constants.SHOW_ROLE_REQUESTED, props<{ roleId: string }>());
export const showRoleSucceeded = createAction(constants.SHOW_ROLE_SUCCEEDED, props<{ role: Role }>());
export const showRoleFailed = createAction(constants.SHOW_ROLE_FAILED, props<{ error: string }>());

export const createRoleRequested = createAction(constants.CREATE_ROLE_REQUESTED, props<{ role: Role }>());
export const createRoleSucceeded = createAction(constants.CREATE_ROLE_SUCCEEDED, props<{ roleId: string }>());
export const createRoleFailed = createAction(constants.CREATE_ROLE_FAILED, props<{ error: string }>());

export const updateRoleRequested = createAction(constants.UPDATE_ROLE_REQUESTED, props<{ role: Role, roleId: string, linkMenus: LinkMenus }>());
export const updateRoleSucceeded = createAction(constants.UPDATE_ROLE_SUCCEEDED, props<{ roleId: string, linkMenus: LinkMenus }>());
export const updateRoleFailed = createAction(constants.UPDATE_ROLE_FAILED, props<{ error: string }>());
export const updateRoleMenus = createAction(constants.UPDATE_ROLE_MENUS, props<{ roleMenusPermissions: RoleMenusPermissions }>());

export const deleteRoleRequested = createAction(constants.DELETE_ROLE_REQUESTED, props<{ roleId: string }>());
export const deleteRoleSucceeded = createAction(constants.DELETE_ROLE_SUCCEEDED, props<{ roleId: string }>());
export const deleteRoleFailed = createAction(constants.DELETE_ROLE_FAILED, props<{ error: string }>());

export const menuShowByRoleRequested = createAction(constants.MENUS_SHOW_BY_ROLE_REQUESTED, props<{ roleId: string }>());
export const menuShowByRoleSucceeded = createAction(constants.MENUS_SHOW_BY_ROLE_SUCCEEDED, props<{ roleMenus: Menu[] }>());
export const menuShowByRoleFailed = createAction(constants.MENUS_SHOW_BY_ROLE_FAILED, props<{ error: string }>());

export const linkRoleWithMenusRequested = createAction(constants.LINK_ROLE_WITH_MENUS_REQUESTED, props<{ linkMenus: LinkMenus, roleId: string }>());
export const linkRoleWithMenusSucceeded = createAction(constants.LINK_ROLE_WITH_MENUS_SUCCEEDED);
export const linkRoleWithMenusFailed = createAction(constants.LINK_ROLE_WITH_MENUS_FAILED, props<{ error: string }>());
