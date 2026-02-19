import {TableRow} from '../types/data'

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

function lastSegment(key: string): string {
  const parts = key.split("/");
  return parts[parts.length - 1];
}
