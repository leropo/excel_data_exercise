const OUTLINE_LEVEL_FIELD = 'outline_level'

const XLSX_COLUMNS = [
    { header: "Outline Level", field: OUTLINE_LEVEL_FIELD },
    { header: "Code", field: "code" },
    { header: "Name", field: "name" },
    { header: "Description", field: "description" },
    { header: "Quantity Type", field: "quantity_type" },
    { header: "Quantity Unit", field: "quantity_unit" },
    { header: "Quantity Formula", field: "quantity_formula" },
    { header: "Element Query", field: "element_query" },
 ];

const LEAF_NODE_ENDING = '.0';
const XLSX_EXTENSION = '.xlsx';
const XLS_EXTENSION = '.xls';

const OUTLINE_LEVEL_INDEX = XLSX_COLUMNS.findIndex(column => column.field === OUTLINE_LEVEL_FIELD);
 
const ERROR_TYPE_WRONG_HEADER = "WRONG_HEADER"
const ERROR_TYPE_WRONG_OUTLINE = "WRONG_OUTLINE"


export { XLSX_COLUMNS, ERROR_TYPE_WRONG_HEADER, ERROR_TYPE_WRONG_OUTLINE, LEAF_NODE_ENDING, XLSX_EXTENSION, XLS_EXTENSION, OUTLINE_LEVEL_INDEX };