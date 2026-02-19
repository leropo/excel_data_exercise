import { createContext, useContext } from 'react';
import { TableRow } from "../types/data";

interface TreeDataContextValue {
    treeData: TableRow[];
}
  
export const TreeDataContext = createContext<TreeDataContextValue | undefined>(undefined);
  
export const useTreeDataState = () => {
    const context = useContext(TreeDataContext);
    if (context === undefined) {
        throw new Error('useTreeUiState must be used within a TreeDataProvider');
    }
    return context;
};
  