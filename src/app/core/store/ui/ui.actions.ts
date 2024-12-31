import {createActionGroup, emptyProps} from '@ngrx/store';


export const UiActions = createActionGroup({
  source: "UI",
  events: {
    'Open SidePanel': emptyProps(),
    'Close SidePanel': emptyProps(),
    'Toggle SidePanel': emptyProps(),
  }
})
