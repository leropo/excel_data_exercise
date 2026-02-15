import { CVS_COLUMNS, LEAF_NODE_ENDING } from './constants'
import { CsvRow, TableRow } from "../types/types";

function parseValues(row): CsvRow {
  const obj = {} as CsvRow;
  
  row.forEach((field, index) => {
    obj[CVS_COLUMNS[index].field] = row[index];
  });
   
  return obj;
}

export function validateExcelFile(file: File): boolean {
  // TODO: Implement validation logic
  return true;
}

export function parseExcelFile(data: unknown[][]): any[] {
  const body = data.slice(1);
  const root: TableRow[] = [];
  const lookup: Record<string, TableRow> = {};

  for (const row of body) {
    const id = row[0] as string;
    const isLeaf = id.endsWith(LEAF_NODE_ENDING);

    const parts = id.split(".");
    const isRoot = parts.length === 1;

    const parentKey = parts.slice(0, -1).join(".");

    console.log(parseValues(row));

    const node: TableRow = {id, data: parseValues(row), isLeaf: isLeaf };
    if (!isLeaf) {
      node.children = [];
    }
    lookup[id] = node;

    if (isRoot) {
        root.push(node);
        continue;
    }
    const parent = lookup[parentKey];
    // If parent does not exists skip, it is assumed data is correctly sorted
    if (!parent) {
      continue;
    }
    lookup[parentKey].children.push(node);
  }
  return root;
}
