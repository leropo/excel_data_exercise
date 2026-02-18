import { useState } from "react";
import { Row } from "./Row";
import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";

export default function TreeTable({ data }: {data: TableRow[]}) {
    const { t } = useTranslation();
    const [stickyHeader, setStrickyHeader] = useState<boolean>(false);

    const changeSticky = () => {
      setStrickyHeader(!stickyHeader)
    };

    return (
    <div>
      <div className="table-controls">

        <button 
            className="global-toggle-button"
            onClick={()=>{}}
            aria-label={t.table.expandAll}
          >
            {`${t.table.expandAll}`}
        </button>
        <button 
            className="global-toggle-button"
            onClick={()=>{}}
            aria-label={t.table.collapseAll}
          >
            {`${t.table.collapseAll}`}
        </button>
        
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
  