import {
  createAction,
  createReducer,
  on,
  createSelector,
  MetaReducer,
  ActionReducerMap,
} from '@ngrx/store';

// I create
export interface IAppState {
  activeLink: string;
}

export const initialState: IAppState = {
  activeLink: 'home',
};

export const updateActiveLink = createAction(
  '[Update] UPDATE_ACTIVE_LINK',
  (active: string) => ({ active })
);

// Reducers
export const appReducer = createReducer(
  initialState as IAppState,
  on(updateActiveLink, (state, { active }) => ({
    ...state,
    activeLink: active,
  }))
);

export const metaReducers: MetaReducer<IAppState>[] = [];

// Selector
export const selectActive = (state: IAppState) => state.activeLink;
export const getActiveLink = createSelector(
  selectActive,
  (activeLink) => activeLink
);
