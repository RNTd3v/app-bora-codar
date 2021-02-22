import { createReducer, on, createAction } from '@ngrx/store';

export const themeReducer = createReducer(
  { openMenu: true },
  on(createAction('[Aside] Toggle Open Menu'), state => {
    console.log(`Original state: ${JSON.stringify(state)}`);
    return {
      ...state,
      openMenu: !state.openMenu
    };
  })
);
