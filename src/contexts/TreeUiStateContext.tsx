import React, { createContext, useContext, Dispatch } from 'react';
import { TreeUiState } from '../types/data';

export type TreeUiStateAction =
  | { type: 'TOGGLE_EXPAND'; key: string }
  | { type: 'EXPAND_ALL' }
  | { type: 'COLLAPSE_ALL' }
  | { type: 'INIT_STATE'; state: TreeUiState }

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
