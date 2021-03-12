import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User, FilterState } from '@cms/core';
import * as UserActions from './users.actions';
import * as AppState from '../../../../theme/state/app.reducer';

export interface State extends AppState.State {
  users: UserState;
}

export interface UserState {
  currentUserId: number | string | null;
  userFilter: FilterState;
  users: User[];
  error: string;
}

const initialState = {
  currentUserId: null,
  userFilter: null,
  users: [],
  error: ''
} as UserState;

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.setCurrentUser, (state, action): UserState => {
    return {
      ...state,
      currentUserId: action.currentUserId
    };
  }),
  on(UserActions.clearCurrentUser, (state): UserState => {
    return {
      ...state,
      currentUserId: null
    };
  }),
  on(UserActions.initializeCurrentUser, (state): UserState => {
    return {
      ...state,
      currentUserId: 0
    };
  }),
  on(UserActions.paginateUsersSucceeded, (state, action): UserState => {
    return {
      ...state,
      users: action.users
    }
  }),
  on(UserActions.loadUsersFailure, (state, action): UserState => {
    return {
      ...state,
      users: [],
      error: action.error
    }
  }),
  on(UserActions.showUserSucceeded, (state, action): UserState => {
    return {
      ...state,
      currentUserId: action.user.id
    }
  }),
  on(UserActions.loadUserFailure, (state, action): UserState => {
    return {
      ...state,
      users: [],
      error: action.error
    }
  }),
  on(UserActions.updateUserSuccess, (state, action): UserState => {
    const updatedUsers = state.users.map(
      item => action.user.id === item.id ? action.user : item
    )
    return {
      ...state,
      users: updatedUsers,
      currentUserId: action.user.id,
      error: ''
    }
  }),
  on(UserActions.updateUserFailure, (state, action): UserState => {
    return {
      ...state,
      error: action.error
    }
  })
);
