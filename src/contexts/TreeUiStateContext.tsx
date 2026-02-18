import React, { createContext, useContext, Dispatch } from 'react';
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
