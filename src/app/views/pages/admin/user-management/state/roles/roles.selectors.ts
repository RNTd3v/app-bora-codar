import { createFeatureSelector, createSelector } from "@ngrx/store";
import { RoleState } from './roles.reducer';

const roleState = createFeatureSelector<RoleState>('roles');

export const paginateRoles = createSelector(roleState, state => state.roles);
export const showRole = createSelector(roleState, state => state.role);
