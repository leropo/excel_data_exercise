import { useState } from "react";
import { Row } from "./Row";
import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";

export default function TreeTable({ data }: {data: TableRow[]}) {
    const { t } = useTranslation();
    const [expandAll, setExpandAll] = useState<boolean | null>(null);
    const [showWithOverflow, setShowWithOverflow] = useState<boolean>(true);

    const handleToggleAll = () => {
        setExpandAll(prev => prev === true ? false : true);
    };

    return (
      <div className={showWithOverflow ? "table-wrapper-scrollable" : ""}>
        <div className="table-controls">
          <button 
            className="global-toggle-button"
            onClick={() => {setShowWithOverflow(!showWithOverflow)}}
            aria-label={showWithOverflow ? t.table.removeTableOverflow : t.table.addTableOverflow}
          >
            {showWithOverflow ? t.table.removeTableOverflow :  t.table.addTableOverflow}
          </button>
        </div>

        <div className="table-controls">
          <button 
            className="global-toggle-button"
            onClick={handleToggleAll}
            aria-label={expandAll ? t.table.collapseAll : t.table.expandAll}
          >
            {expandAll ? `▼ ${t.table.collapseAll}` : `▶ ${t.table.expandAll}`}
          </button>
        </div>
        <table className="data-table">
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
              <Row key={`data_row_${node.key}`} node={node} expandAll={expandAll} />
            ))}
          </tbody>
        </table>
      </div>
      );
  }
  