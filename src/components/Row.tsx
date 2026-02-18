import { DetailedInfo } from "./DetailedInfo";
import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";
import { useTreeUiState } from "../contexts/TreeUiStateContext";
import { TreeUiActionTypes } from '../constants/uistate'

export function Row({ 
  node, 
  depth = 0
}: { 
  node: TableRow; 
  depth?: number;
}) {
  const { t } = useTranslation();
  const { uiState, dispatch } = useTreeUiState();
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = node.isLeaf;
  const isExpanded = uiState[node.key]?.expanded ?? false;

  const handleToggleExpand = () => {
    dispatch({ type: TreeUiActionTypes.TOGGLE_EXPAND, key: node.key });
  };

  return (
    <>
      <tr className="row">
        <td style={{ paddingLeft: depth * 20 + 10 }}>
          <button
            className="collapse-button"
            onClick={handleToggleExpand}
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
          <Row key={`data_row_${child.key}`} node={child} depth={depth + 1} />
        ))}

      {isExpanded && isLeaf &&
          <DetailedInfo key={`detailed_info_${node.key}`} node={node} />
      }

    </>
  );
}