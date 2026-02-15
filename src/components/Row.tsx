import { useState } from "react";
import { DetailedInfo } from "./DetailedInfo";

export function Row({ node, depth = 0 }) {
  const [open, setOpen] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <>
      <tr key={node.id}
        className="row"
        onClick={() => hasChildren && setOpen(!open)}
      >
        <td 
          style={{ paddingLeft: depth * 20 + 10}}>
          {hasChildren && (
            <span 
              className="collapse-icon">
              {open ? "▼" : "▶"}
            </span>
          )}
        </td>
        <td>
          {node.data[0]}
        </td>
        <td>
          {node.data[1]}
        </td>
        <td>
          {node.data[2]}
        </td>
      </tr>

      {open && hasChildren &&
        node.children.map(child => (
          <Row key={child.id} node={child} depth={depth + 1} />
        ))}

      {node.isLeaf &&
          <DetailedInfo key={`detailed_info_${node.id}`} node={node} depth={depth}  />
      }

    </>
  );
}