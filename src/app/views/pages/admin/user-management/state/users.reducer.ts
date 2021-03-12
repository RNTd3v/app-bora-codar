import { createReducer, on } from "@ngrx/store";
import { User} from '@cms/core';
import * as AppState from '../../../../theme/state/app.reducer';
import {
  paginateUsersRequested, paginateUsersSucceeded, paginateUsersFailed,
  showUserRequested, showUserSucceeded, showUserFailed, createUserRequested,
  createUserSucceeded, createUserFailed, updateUserRequested, updateUserSucceeded,
  updateUserFailed, updateUserPasswordRequested, updateUserPasswordSucceeded,
  updateUserPasswordFailed, updateUserStatusRequested, updateUserStatusSucceeded,
  updateUserStatusFailed, deleteUserRequested, deleteUserSucceeded, deleteUserFailed, paginateUsersCleared } from "./users.actions";

export interface State extends AppState.State {
  users: UserState;
}
export interface UserState {
  users: User[];
  user: User;
  error: any;
}

const initialState = {
  users: [],
  user: {},
  error: ''
} as UserState;

export const userReducer = createReducer<UserState>(

  initialState,

  // Paginate
  on(paginateUsersRequested, (state) => state),
  on(paginateUsersSucceeded, (state, { users }) => ({...state, users })),
  on(paginateUsersFailed, (state, { error }) => ({...state, error })),
  on(paginateUsersCleared, (state) => ({...state, users: [] })),

  // Show
  on(showUserRequested, (state) => state),
  on(showUserSucceeded, (state, { user }) => ({...state, user })),
  on(showUserFailed, (state, { error }) => ({...state, error })),

  // Create
  on(createUserRequested, (state, { user }) => ({...state, user })),
  on(createUserSucceeded, (state) => state),
  on(createUserFailed, (state, { error }) => ({...state, error })),

  // Update
  on(updateUserRequested, (state, { user }) => ({...state, user })),
  on(updateUserSucceeded, (state) => state),
  on(updateUserFailed, (state, { error }) => ({...state, error })),

  // Update Password
  on(updateUserPasswordRequested, (state) => state),
  on(updateUserPasswordSucceeded, (state) => state),
  on(updateUserPasswordFailed, (state, { error }) => ({...state, error })),

  // Update Status
  on(updateUserStatusRequested, (state) => state),
  on(updateUserStatusSucceeded, (state) => state),
  on(updateUserStatusFailed, (state, { error }) => ({...state, error })),

  // Update Avatar
  // on(updateUserAvatarRequested, (state) => state),
  // on(updateUserAvatarSucceeded, (state) => state),
  // on(updateUserAvatarFailed, (state, { error }) => ({...state, error })),

  // Delete
  on(deleteUserRequested, (state) => state),
  on(deleteUserSucceeded, (state) => state),
  on(deleteUserFailed, (state, { error }) => ({...state, error })),

);
