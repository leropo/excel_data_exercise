export type CsvRow = {
  outline_level: string;
  code: string;
  name: string;
  description: string;
  quantity_type: string;
  quantity_unit: string;
  quantity_formula: string;
  element_query: string;
};

export type UnkeyedRow = {
  data: CsvRow;
  isLeaf: boolean;
  children: Array<UnkeyedRow>;
};

export type TableRow = {
  key: string;
  isLeaf: boolean;
  data: CsvRow;
  children: Array<TableRow>
};