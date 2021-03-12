import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from '@cms/core';
import { UserState } from './users.reducer';

const userState = createFeatureSelector<UserState>('users');

export const paginateUsers = createSelector(userState, state => state.users);

export const getCurrentUserId = createSelector(
  userState,
  state => state.currentUserId
)

export const getCurrentUser = createSelector(
  userState,
  getCurrentUserId,
  (state, currentUserId) => {
    if (currentUserId === 0) {
      return  {
        name: '',
        email: '',
        avatar: '/assets/icons/user.svg',
        isActive: false,
        roles: []
      } as User
    } else {
      return currentUserId ? state.users.find(user => user.id === currentUserId) : null
    }
  }
);

export const getError = createSelector(
  userState,
  state => state.error
)
