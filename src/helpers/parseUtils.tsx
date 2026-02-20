import { XLSX_COLUMNS, LEAF_NODE_ENDING, OUTLINE_LEVEL_INDEX, ERROR_TYPE_WRONG_HEADER, ERROR_TYPE_WRONG_OUTLINE } from '../constants/xlsx'
import { CsvRow, TableRow, UnkeyedRow } from "../types/data";
import { validateOutlineLevels } from './validators'
import type { TranslationKeys } from '../i18n/translations/en';

function parseValues(row: string[]): CsvRow {
  const obj = {} as CsvRow;
  row.forEach((field, index) => {
    const key = XLSX_COLUMNS[index].field as keyof CsvRow;
    obj[key] = field;
  });
   
  return obj;
}

function assignAutoKeys(
  nodes: UnkeyedRow[],
  parentKey: string = ""
): TableRow[] {
  let counter = 1;

  const result: TableRow[] = nodes.map((node) => {
    const key = parentKey ? `${parentKey}/${counter}` : `${counter}`;
    counter++;

    const children = node.children.length
      ? assignAutoKeys(node.children, key)
      : [];

    return {key: key, data: node.data,  isLeaf: node.isLeaf, children}
  });

  return result;
}


export function validateExcelFile(data: string[][], t: TranslationKeys): Record<string, any> {
  const header = data[0];
  const expectedHeaders = XLSX_COLUMNS.map(c => c.header);
  const headerMatch = header.length === expectedHeaders.length &&
    header.every((value, index) => value === expectedHeaders[index]);

  if (!headerMatch) {
    return {
      "error": ERROR_TYPE_WRONG_HEADER,
      "expected_header": expectedHeaders,
      "wrong_header": header,
    }
  }

  const body = data.slice(1);
  const errors = validateOutlineLevels(body, OUTLINE_LEVEL_INDEX, t)
 
  if (errors.length > 0) {
     return {
      "error": ERROR_TYPE_WRONG_OUTLINE,
      "errors": errors,
    }
  }

  return {};
}

export function parseExcelFile(data: string[][]): TableRow[] {
  const body = data.slice(1);
  const root: UnkeyedRow[] = [];
  const lookup: Record<string, UnkeyedRow> = {};

  for (const row of body) {
    const id = row[0] as string;
    const parts = id.split(".");
    const isLeaf = id.endsWith(LEAF_NODE_ENDING);
    const isRoot = parts.length === 1;
    const node: UnkeyedRow = {data: parseValues(row), isLeaf: isLeaf, children: []};

    // lead nodes are not added lookup because their id is not unique
    // lookup holds id of hiearchical structure
    if (!isLeaf) {
      lookup[id] = node;
    }

    if (isRoot) {
        root.push(node);
        continue;
    }

    const parentKey = parts.slice(0, -1).join(".");
    const parent = lookup[parentKey];
    // If parent does not exists skip, it is currently assumed that data is correctly sorted
    if (!parent) {
      continue;
    }
    lookup[parentKey].children.push(node);
  }

  return assignAutoKeys(root);
}
