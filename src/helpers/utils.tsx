import { cvsColumns } from './constants'


/*

function buildHierarchy(list) {
  const root = [];

  // Map for quick lookup: "1.1.2" → node reference
  const lookup = {};

  for (const id of list) {
    const parts = id.split(".");
    const parentKey = parts.slice(0, -1).join(".");
    const isRoot = parts.length === 1;

    const node = { id, children: [] };
    lookup[id] = node;

    if (isRoot) {
      // Top-level node
      root.push(node);
    } else {
      // Attach to parent
      const parent = lookup[parentKey];

      // If parent doesn't exist yet (unordered input), create placeholder
      if (!parent) {
        lookup[parentKey] = { id: parentKey, children: [] };
      }

      lookup[parentKey].children.push(node);
    }
  }

  return root;
}

*/

export function validateExcelFile(file: File): boolean {
  // TODO: Implement validation logic
  return true;
}

export function parseExcelFile(data: unknown[][]): any[] {
  // TODO: Implement parsing logic  
  const body = data.slice(1);

  const root: any[] = [];
  const lookup: Record<string, any> = {};

  for (const row of body) {
    const id = row[0] as string;
    const parts = id.split(".");
    const parentKey = parts.slice(0, -1).join(".");
    const isRoot = parts.length === 1;

    const node = {id, data: row, children: [] };
    lookup[id] = node;

    if (isRoot) {
        root.push(node);
        continue;
    }

    const parent = lookup[parentKey];
    // If parent doesn't exist yet (unordered input), create placeholder
    if (!parent) {
      lookup[parentKey] = { id: parentKey, data: row, children: [] };
    }
    lookup[parentKey].children.push(node);


  }
  console.log(root);


  return root;
}
