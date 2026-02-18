import React, { createContext, useContext } from 'react';
import { TreeUiState } from '../types/data';

interface TreeUiStateContextType {
  uiState: TreeUiState;
  toggleExpand: (key: string) => void;
}

export const TreeUiStateContext = createContext<TreeUiStateContextType | undefined>(undefined);

export const useTreeUiState = () => {
  const context = useContext(TreeUiStateContext);
  if (context === undefined) {
    throw new Error('useTreeUiState must be used within a TreeUiStateProvider');
  }
  return context;
};
