import { createAction, props } from '@ngrx/store';
import { User } from '@cms/core';

export const setLoggedInUser = createAction(
  '[User] Set Logged In User',
  props<{ user: User }>()
)

export const setCurrentUser = createAction(
  '[User] Set Current User',
  props<{ user: User }>()
)

export const clearCurrentUser = createAction(
  '[User] Clear Current User'
)

export const initializeCurrentUser = createAction(
  '[User] Initialize Current User'
)
