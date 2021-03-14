import { createAction, props } from '@ngrx/store';
import { User, UserChangePassword, UserStatus } from '@cms/core';

import * as constants from './users.constants';

export const paginateUsersRequested = createAction(constants.PAGINATE_USERS_REQUESTED);
export const paginateUsersSucceeded = createAction(constants.PAGINATE_USERS_SUCCEEDED, props<{ users: User[] }>());
export const paginateUsersFailed = createAction(constants.PAGINATE_USERS_FAILED, props<{ error: string }>());
export const paginateUsersCleared = createAction(constants.PAGINATE_USERS_CLEARED);

export const showUserRequested = createAction(constants.SHOW_USER_REQUESTED, props<{ userId: string }>());
export const showUserSucceeded = createAction(constants.SHOW_USER_SUCCEEDED, props<{ user: User }>());
export const showUserFailed = createAction(constants.SHOW_USER_FAILED, props<{ error: string }>());

export const createUserRequested = createAction(constants.CREATE_USER_REQUESTED, props<{ user: User }>());
export const createUserSucceeded = createAction(constants.CREATE_USER_SUCCEEDED);
export const createUserFailed = createAction(constants.CREATE_USER_FAILED, props<{ error: string }>());

export const updateUserRequested = createAction(constants.UPDATE_USER_REQUESTED, props<{ user: User, userId: string }>());
export const updateUserSucceeded = createAction(constants.UPDATE_USER_SUCCEEDED, props<{ user: User }>());
export const updateUserFailed = createAction(constants.UPDATE_USER_FAILED, props<{ error: string }>());

export const updateUserPasswordRequested = createAction(constants.UPDATE_USER_PASSWORD_REQUESTED, props<{ data: UserChangePassword, userId: string }>());
export const updateUserPasswordSucceeded = createAction(constants.UPDATE_USER_PASSWORD_SUCCEEDED);
export const updateUserPasswordFailed = createAction(constants.UPDATE_USER_PASSWORD_FAILED, props<{ error: string }>());

export const updateUserStatusRequested = createAction(constants.UPDATE_USER_STATUS_REQUESTED, props<{ data: UserStatus, userId: string }>());
export const updateUserStatusSucceeded = createAction(constants.UPDATE_USER_STATUS_SUCCEEDED);
export const updateUserStatusFailed = createAction(constants.UPDATE_USER_STATUS_FAILED, props<{ error: string }>());

// export const updateUserAvatarRequested = createAction(constants.UPDATE_USER_AVATAR_REQUESTED, props<{ avatar: FormData, userId: string }>());
// export const updateUserAvatarSucceeded = createAction(constants.UPDATE_USER_AVATAR_SUCCEEDED);
// export const updateUserAvatarFailed = createAction(constants.UPDATE_USER_AVATAR_FAILED, props<{ error: string }>());

export const deleteUserRequested = createAction(constants.DELETE_USER_REQUESTED, props<{ userId: string }>());
export const deleteUserSucceeded = createAction(constants.DELETE_USER_SUCCEEDED);
export const deleteUserFailed = createAction(constants.DELETE_USER_FAILED, props<{ error: string }>());
