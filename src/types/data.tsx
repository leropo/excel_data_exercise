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

export type TableRow = {
  id: string;
  key: number;
  data: CsvRow;
  isLeaf: boolean;
  children: Array<TableRow>
};