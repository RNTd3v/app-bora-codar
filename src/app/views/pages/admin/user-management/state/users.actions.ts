import { createAction, props } from '@ngrx/store';
import { User, UserChangePassword, UserStatus } from '@cms/core';

import * as constants from './users.constants';

export const paginateUsersRequested = createAction(constants.PAGINATE_USERS_REQUESTED);
export const paginateUsersSucceeded = createAction(constants.PAGINATE_USERS_SUCCEEDED, props<{ users: User[] }>());
export const paginateUsersFailed = createAction(constants.PAGINATE_USERS_FAILED);

export const showUserRequested = createAction(constants.SHOW_USER_REQUESTED, props<{ userId: string }>());
export const showUserSucceeded = createAction(constants.SHOW_USER_SUCCEEDED, props<{ user: User }>());
export const showUserFailed = createAction(constants.SHOW_USER_FAILED);

export const createUserRequested = createAction(constants.CREATE_USER_REQUESTED, props<{ user: User }>());
export const createUserSucceeded = createAction(constants.CREATE_USER_SUCCEEDED);
export const createUserFailed = createAction(constants.CREATE_USER_FAILED);

export const updateUserRequested = createAction(constants.UPDATE_USER_REQUESTED, props<{ user: User, userId: string }>());
export const updateUserSucceeded = createAction(constants.UPDATE_USER_SUCCEEDED);
export const updateUserFailed = createAction(constants.UPDATE_USER_FAILED);

export const updateUserPasswordRequested = createAction(constants.UPDATE_USER_PASSWORD_REQUESTED, props<{ data: UserChangePassword, userId: string }>());
export const updateUserPasswordSucceeded = createAction(constants.UPDATE_USER_PASSWORD_SUCCEEDED);
export const updateUserPasswordFailed = createAction(constants.UPDATE_USER_PASSWORD_FAILED);

export const updateUserStatusRequested = createAction(constants.UPDATE_USER_STATUS_REQUESTED, props<{ data: UserStatus, userId: string }>());
export const updateUserStatusSucceeded = createAction(constants.UPDATE_USER_STATUS_SUCCEEDED);
export const updateUserStatusFailed = createAction(constants.UPDATE_USER_STATUS_FAILED);

export const updateUserAvatarRequested = createAction(constants.UPDATE_USER_AVATAR_REQUESTED, props<{ avatar: FormData }>());
export const updateUserAvatarSucceeded = createAction(constants.UPDATE_USER_AVATAR_SUCCEEDED);
export const updateUserAvatarFailed = createAction(constants.UPDATE_USER_AVATAR_FAILED);

export const deleteUserRequested = createAction(constants.DELETE_USER_REQUESTED);
export const deleteUserSucceeded = createAction(constants.DELETE_USER_SUCCEEDED);
export const deleteUserFailed = createAction(constants.DELETE_USER_FAILED);







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
