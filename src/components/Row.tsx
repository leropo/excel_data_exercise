import { useState, useEffect } from "react";
import { DetailedInfo } from "./DetailedInfo";
import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";

export function Row({ 
  node, 
  depth = 0, 
  expandAll = null 
}: { 
  node: TableRow; 
  depth?: number;
  expandAll?: boolean | null;
}) {
  const { t } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = node.isLeaf;

  // Sync with global expand/collapse state
  useEffect(() => {
    if (expandAll !== null) {
      setIsExpanded(expandAll);
    }
  }, [expandAll]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <tr className="row">
        <td style={{ paddingLeft: depth * 20 + 10 }}>
          <button
            className="collapse-button"
            onClick={toggleExpand}
            aria-label={isExpanded ? t.row.collapse : t.row.expand}
          >
            {(hasChildren || isLeaf) && (
              <span className="collapse-icon">
                {isExpanded ? "▼" : "▶"}
              </span>
            )}
          </button>
        </td>
        
        <td>
          {node.data.outline_level}
        </td>
        <td>
          {node.data.code}
        </td>
        <td>
          {node.data.name}
        </td>
      </tr>

      {isExpanded && hasChildren &&
        node.children.map(child => (
          <Row key={`data_row_${child.key}`} node={child} depth={depth + 1} expandAll={expandAll} />
        ))}

      {isExpanded && isLeaf &&
          <DetailedInfo key={`detailed_info_${node.key}`} node={node} />
      }

    </>
  );
}