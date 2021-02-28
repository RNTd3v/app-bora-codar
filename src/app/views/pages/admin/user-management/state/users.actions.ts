import { createAction, props } from '@ngrx/store';
import { User } from '@cms/core';

export const setLoggedInUser = createAction(
  '[User] Set Logged In User',
  props<{ user: User }>()
)

export const setCurrentUser = createAction(
  '[User] Set Current User Id',
  props<{ currentUserId: string }>()
)

export const clearCurrentUser = createAction(
  '[User] Clear Current User'
)

export const initializeCurrentUser = createAction(
  '[User] Initialize Current User'
)

export const loadUsers = createAction(
  '[Users] Load'
)

export const loadUsersSuccess = createAction(
  '[Users] Load Success',
  props<{ users: User[] }>()
)

export const loadUsersFailure = createAction(
  '[Users] Load Fail',
  props<{ error: string }>()
)

export const loadUser = createAction(
  '[User] Load',
  props<{ userId: string }>()
)

export const loadUserSuccess = createAction(
  '[User] Load Success',
  props<{ user: User }>()
)

export const loadUserFailure = createAction(
  '[User] Load Fail',
  props<{ error: string }>()
)

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
)

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
)

export const updateUserFailure = createAction(
  '[User] Update User Fail',
  props<{ error: string }>()
)
