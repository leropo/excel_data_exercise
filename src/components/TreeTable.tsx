import { Row } from "./Row";
import { TableRow } from "../types/types";

export default function TreeTable({ data }: {data: TableRow[]}) {
    return (
      <table className="data-table">
        <thead>
            <th>
            </th> 
            <th>
              Outline Level
            </th>  
            <th>
              Code         	
            </th> 
            <th>
              Name
            </th>
        </thead>
        <tbody>
          {data.map(node => (
            <Row  node={node} />
          ))}
        </tbody>
      </table>
      );
  }
  