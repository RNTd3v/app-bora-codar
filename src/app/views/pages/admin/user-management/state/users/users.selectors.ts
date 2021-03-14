import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from './users.reducer';

const userState = createFeatureSelector<UserState>('users');

export const paginateUsers = createSelector(userState, state => state.users);
export const showUser = createSelector(userState, state => state.user);
