import { useState } from "react";
import { Row } from "./Row";
import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";

export default function TreeTable({ data }: {data: TableRow[]}) {
    const { t } = useTranslation();
    const [expandAll, setExpandAll] = useState<boolean | null>(null);

    const handleToggleAll = () => {
        setExpandAll(prev => prev === true ? false : true);
    };

    return (
      <div>
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
          </thead>
          <tbody>
            {data.map(node => (
              <Row key={node.id} node={node} expandAll={expandAll} />
            ))}
          </tbody>
        </table>
      </div>
      );
  }
  