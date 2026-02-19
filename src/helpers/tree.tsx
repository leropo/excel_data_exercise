import {TableRow, HiearchyKeys} from '../types/data'

export function flattenField<T extends { children: T[] }, K extends keyof T>(
    nodes: T[],
    field: K
  ): T[K][] {
    const result: T[K][] = [];
  
    function walk(list: T[]) {
      for (const node of list) {
        result.push(node[field]);
        if (Array.isArray(node.children)) {
          walk(node.children as T[]);
        }
      }
    }  
    walk(nodes);
    return result;
}
  
export function findNodeByKeyPath(
  roots: TableRow[],
  key: string
): TableRow | null {
  const parts = key.split("/");

  let currentLevel = roots;
  let currentNode: TableRow | undefined;

  for (const part of parts) {
    currentNode = currentLevel.find(
      node => lastSegment(node.key) === part
    );
    if (!currentNode) {
      return null;
    } 
    currentLevel = currentNode.children;
  }

  return currentNode ?? null;
}

export function groupParentAndLeaf(root: TableRow[]): HiearchyKeys {
  const leafKeys: string[] = [];
  const parentKeys: string[] = [];

  function traverse(node: TableRow) {
    if (node.isLeaf) {
      leafKeys.push(node.key);
    } else {
      parentKeys.push(node.key);
      node.children.forEach(traverse);
    }
  }
  root.forEach(traverse);
  return {upper: parentKeys, lower: leafKeys}; 
}

export function groupLevelAboveLeaf(root: TableRow[]): HiearchyKeys {
  const onlyNonLeafChildrenKeys: string[] = [];
  const leafOrHasLeafChildrenKeys: string[] = [];

  function traverse(node: TableRow) {
    if (node.isLeaf) {
      // Leaf nodes go directly into group B
      leafOrHasLeafChildrenKeys.push(node.key);
      return;
    }

    // Node is not a leaf → inspect children
    const hasLeafChild = node.children.some(child => child.isLeaf);

    if (hasLeafChild) {
      leafOrHasLeafChildrenKeys.push(node.key);
    } else {
      onlyNonLeafChildrenKeys.push(node.key);
    }

    // Continue traversal
    node.children.forEach(traverse);
  }

  root.forEach(traverse);
  return {upper: onlyNonLeafChildrenKeys, lower: leafOrHasLeafChildrenKeys}; 
}


function lastSegment(key: string): string {
  const parts = key.split("/");
  return parts[parts.length - 1];
}
