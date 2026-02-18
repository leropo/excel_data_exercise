import { useState } from "react";
import { Row } from "./Row";
import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";
import { useTreeUiState } from "../contexts/TreeUiStateContext";
import { TreeUiActionTypes } from '../constants/uistate'

export default function TreeTable({ data }: {data: TableRow[]}) {
    const { t } = useTranslation();
    const { dispatch } = useTreeUiState();
    const [stickyHeader, setStrickyHeader] = useState<boolean>(false);

    const changeSticky = () => {
      setStrickyHeader(!stickyHeader)
    };

    const toggleExpandAll = () => {
      dispatch({ type: TreeUiActionTypes.EXPAND_ALL });
    };

    const toggleCollapseAll = () => {
      dispatch({ type: TreeUiActionTypes.COLLAPSE_ALL });
    };
    return (
    <div>
      <div className="table-controls">

        <button 
            className="global-toggle-button"
            onClick={toggleExpandAll}
            aria-label={t.table.expandAll}
          >
            {`${t.table.expandAll}`}
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
              {data.map(node => (
                <Row key={`data_row_${node.key}`} node={node} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      );
  }
  