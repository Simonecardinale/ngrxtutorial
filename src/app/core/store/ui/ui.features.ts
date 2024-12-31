import {createFeature, createReducer, on} from '@ngrx/store';
import {UiActions} from './ui.actions';

export interface UiState {
  sidePanelOpened: boolean
}

const initialState: UiState = {
  sidePanelOpened: false
}

export const uiFeatures = createFeature({
  name: "ui",
  reducer: createReducer(
    initialState,
    on(UiActions.closeSidePanel, (state, action): UiState => ({...state, sidePanelOpened: false})),
    on(UiActions.openSidePanel, (state, action): UiState => ({...state, sidePanelOpened: true})),
    on(UiActions.toggleSidePanel, (state, action): UiState => ({...state, sidePanelOpened: !state.sidePanelOpened})),
  )
})

export const {
  selectSidePanelOpened
} = uiFeatures
