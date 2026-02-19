import { DetailedInfo } from "./DetailedInfo";
import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";
import { useTreeUiState } from "../contexts/TreeUiStateContext";
import { useTreeDataState } from "../contexts/TreeDataContext";
import { TreeUiActionTypes } from '../constants/uistate'
import { findNodeByKeyPath } from '../helpers/tree'

export function Row({ 
  node, 
  depth = 0
}: { 
  node: TableRow; 
  depth?: number;
}) {
  const { t } = useTranslation();
  const { uiState, dispatch } = useTreeUiState();
  const { treeData } = useTreeDataState();

  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = node.isLeaf;
  const isExpanded = uiState[node.key]?.expanded ?? false;

  const handleToggleExpand = () => {
    // if node is not leaf node and is now opened, set childs to closed,
    // in case they were opened before
    if (!isLeaf && !isExpanded) {
        const res = findNodeByKeyPath(treeData, node.key);
        const childKeys = res?.children?.map(c => c.key) ?? [];
        dispatch({ type: TreeUiActionTypes.EXPAND_AND_COLLAPSE, expandKeys: [node.key], collapseKeys:childKeys});
    }
    else {
      dispatch({ type: TreeUiActionTypes.TOGGLE_EXPAND, key: node.key });
    }
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

      {isLeaf &&
          <DetailedInfo key={`detailed_info_${node.key}`} node={node} isExpanded={isExpanded} />
      }

    </>
  );
}