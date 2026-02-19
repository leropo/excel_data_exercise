import { useState } from "react";
import { Row } from "./Row";
import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";
import { useTreeUiState } from "../contexts/TreeUiStateContext";
import { TreeDataContext } from "../contexts/TreeDataContext";
import { TreeUiActionTypes } from '../constants/uistate'
import { groupParentAndLeaf, groupLevelAboveLeaf } from '../helpers/tree'

export default function TreeTable({ treeData }: {treeData: TableRow[]}) {
    const { t } = useTranslation();
    const { dispatch } = useTreeUiState();
    const [stickyHeader, setStrickyHeader] = useState<boolean>(false);

    const changeSticky = () => {
      setStrickyHeader(!stickyHeader)
    };

    const toggleExpandParents = () => { 
      const {upper, lower} = groupParentAndLeaf(treeData);
      dispatch({ type: TreeUiActionTypes.EXPAND_AND_COLLAPSE, expandKeys: upper, collapseKeys:lower});
    };

    const toggleExpandAboveLeafs = () => { 
      const {upper, lower} = groupLevelAboveLeaf(treeData);
      dispatch({ type: TreeUiActionTypes.EXPAND_AND_COLLAPSE, expandKeys: upper, collapseKeys:lower});
    };


    const toggleCollapseAll = () => {
      dispatch({ type: TreeUiActionTypes.COLLAPSE_ALL });
    };
    return (
    <div>
      <div className="table-controls">
      
        <button 
            className="global-toggle-button"
            onClick={toggleExpandParents}
            aria-label={t.table.expandAll}
          >
            {`${t.table.expandAll}`}
        </button>
        <button 
            className="global-toggle-button"
            onClick={toggleExpandAboveLeafs}
            aria-label={t.table.expandParents}
          >
            {`${t.table.expandParents}`}
        </button>
        <button 
            className="global-toggle-button"
            onClick={toggleCollapseAll}
            aria-label={t.table.collapseAll}
          >
            {`${t.table.collapseAll}`}
        </button>
        <div className="spacer"></div>
        <button 
          className="global-toggle-button"
          onClick={changeSticky}
          aria-label={stickyHeader ? t.table.unpinHeader : t.table.pinHeader}
        >
          {stickyHeader ? t.table.unpinHeader : t.table.pinHeader}
        </button>

      </div>

      <div className="table-wrapper-scrollable">
          <table  className={
              stickyHeader
                ? 'data-table table-sticky-header'
                : 'data-table'
            }>
            <thead>
              <tr>
                  <th>
                  </th> 
                  <th>
                    {t.table.headers.outlineLevel}
                  </th>  
                  <th>
                    {t.table.headers.code}
                  </th> 
                  <th>
                    {t.table.headers.name}
                  </th>
                </tr>
            </thead>
            <tbody>
              <TreeDataContext.Provider value={{ treeData: treeData }}>
                {treeData.map(node => (
                  <Row key={`data_row_${node.key}`} node={node} />
                ))}
              </TreeDataContext.Provider>
            </tbody>
          </table>
        </div>
      </div>
      );
  }
  