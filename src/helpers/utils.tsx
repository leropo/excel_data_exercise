import { CVS_COLUMNS, LEAF_NODE_ENDING, OUTLINE_LEVEL_INDEX } from './constants'
import { CsvRow, TableRow } from "../types/data";
import { validateOutlineLevels } from '../helpers/validators'

function parseValues(row: string[]): CsvRow {
  const obj = {} as CsvRow;
  row.forEach((field, index) => {
    const key = CVS_COLUMNS[index].field as keyof CsvRow;
    obj[key] = field;
  });
   
  return obj;
}

export function validateExcelFile(data: string[][]): boolean {
  const head = data[0];

  const expectedHeaders = CVS_COLUMNS.map(c => c.header);
  const headerMatch = head.length === expectedHeaders.length &&
    head.every((value, index) => value === expectedHeaders[index]);

  if (!headerMatch) {
    return false
  }

  console.log('headerMatch ',headerMatch)

  const body = data.slice(1);
  const errors = validateOutlineLevels(body, OUTLINE_LEVEL_INDEX)
 
  console.log('errors', errors)
  console.log('errors.length', errors.length)

  if (!errors.length > 0) {
    return false
  }

  return true;
}

export function parseExcelFile(data: string[][]): TableRow[] {
  const body = data.slice(1);
  const root: TableRow[] = [];
  const lookup: Record<string, TableRow> = {};

  for (const row of body) {
    const id = row[0] as string;
    const isLeaf = id.endsWith(LEAF_NODE_ENDING);
    const parts = id.split(".");
    const isRoot = parts.length === 1;
    const parentKey = parts.slice(0, -1).join(".");

    const node: TableRow = {id, data: parseValues(row), isLeaf: isLeaf, children: []};
    lookup[id] = node;

    if (isRoot) {
        root.push(node);
        continue;
    }
    const parent = lookup[parentKey];
    // If parent does not exists skip, it is currently assumed that data is correctly sorted
    if (!parent) {
      continue;
    }
    lookup[parentKey].children.push(node);
  }
  return root;
}
