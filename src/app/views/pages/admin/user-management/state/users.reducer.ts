import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { User, FilterState } from '@cms/core';
import * as UserActions from './users.actions';
import * as AppState from '../../../../theme/state/app.reducer';

export interface State extends AppState.State {
  users: UserState;
}

export interface UserState {
  currentUser: User;
  loggedInUser: User;
  userFilter: FilterState;
  users: User[];
}

const initialState = {
  currentUser: null,
  loggedInUser: null,
  userFilter: null,
  users: []
} as UserState;

const getUserState = createFeatureSelector<UserState>('users');

export const getCurrentUser = createSelector(
  getUserState,
  state => state.currentUser
);

export const getLoggedInUser = createSelector(
  getUserState,
  state => state.loggedInUser
);

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserActions.setLoggedInUser, (state, action): UserState => {
    return {
      ...state,
      loggedInUser: action.user
    };
  }),
  on(UserActions.setCurrentUser, (state, action): UserState => {
    return {
      ...state,
      currentUser: action.user
    };
  }),
  on(UserActions.clearCurrentUser, (state): UserState => {
    return {
      ...state,
      currentUser: null
    };
  }),
  on(UserActions.initializeCurrentUser, (state): UserState => {
    return {
      ...state,
      currentUser: {
        name: '',
        email: '',
        avatar: '/assets/icons/user.svg',
        isActive: false,
        roles: []
      } as User
    };
  })
);
