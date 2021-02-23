import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppActions from './app.actions';

export interface State {
  app: AppState;
}

export interface AppState {
  openMenu: boolean;
  selectedTheme: 'light' | 'dark';
}

const initialState = {
  openMenu: true,
  selectedTheme: 'light'
} as AppState;

const getAppState = createFeatureSelector<AppState>('app');

export const getOpenMenuState = createSelector(
  getAppState,
  state => state.openMenu
);

export const getSelectedTheme = createSelector(
  getAppState,
  state => state.selectedTheme
);

export const appReducer = createReducer<AppState>(
  initialState,
  on(AppActions.toggleOpenMenu, (state): AppState => {
    return {
      ...state,
      openMenu: !state.openMenu
    };
  })
);
