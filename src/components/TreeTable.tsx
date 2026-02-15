import { useState } from "react";
import { Row } from "./Row";
import { TableRow } from "../types/data";

export default function TreeTable({ data }: {data: TableRow[]}) {
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
            aria-label={expandAll ? "Collapse All" : "Expand All"}
          >
            {expandAll ? "▼ Collapse All" : "▶ Expand All"}
          </button>
        </div>
        <table className="data-table">
          <thead>
              <th>
              </th> 
              <th>
                Outline Level
              </th>  
              <th>
                Code         	
              </th> 
              <th>
                Name
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
  