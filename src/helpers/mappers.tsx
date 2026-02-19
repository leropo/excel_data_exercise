import {flattenField} from './tree'
import {TableRow, TreeUiState} from '../types/data'

export function mapTreeToUiState (treeData: TableRow[]): TreeUiState {
    const keys =  flattenField<TableRow, "key">(treeData, "key");
    return Object.fromEntries(keys.map(v => [v,  { expanded: false }]));
}