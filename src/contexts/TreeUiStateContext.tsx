import { createContext, useContext, Dispatch } from 'react';
import { TreeUiState } from '../types/data';
import { TreeUiActionTypes } from '../constants/uistate'


export type TreeUiStateAction =
  | { type: typeof TreeUiActionTypes.TOGGLE_EXPAND; key: string }
  | { type: typeof TreeUiActionTypes.EXPAND_ALL }
  | { type: typeof TreeUiActionTypes.COLLAPSE_ALL }
  | { type: typeof TreeUiActionTypes.INIT_STATE; state: TreeUiState }

interface TreeUiStateContextType {
  uiState: TreeUiState;
  dispatch: Dispatch<TreeUiStateAction>;
}

export const TreeUiStateContext = createContext<TreeUiStateContextType | undefined>(undefined);

export const useTreeUiState = () => {
  const context = useContext(TreeUiStateContext);
  if (context === undefined) {
    throw new Error('useTreeUiState must be used within a TreeUiStateProvider');
  }
  return context;
};

// reducer with all the types of logic, that is used to modify uistate
export function treeUiStateReducer(state: TreeUiState, action: TreeUiStateAction): TreeUiState {
  // this can be changed to if/else for complex logic like toggle_expand or expand_untill items
  switch (action.type) {
    case TreeUiActionTypes.TOGGLE_EXPAND:
      return {
        ...state,
        [action.key]: {
          expanded: !state[action.key]?.expanded
        }
      }
    case TreeUiActionTypes.EXPAND_ALL:
      return Object.fromEntries(
        Object.keys(state).map(key => [key, { expanded: true }])
      )
    case TreeUiActionTypes.COLLAPSE_ALL:
      return Object.fromEntries(
        Object.keys(state).map(key => [key, { expanded: false }])
      )
    case TreeUiActionTypes.INIT_STATE:
      return action.state
    default:
      return state
  }
}

