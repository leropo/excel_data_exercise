import { Row } from "./Row";

export default function TreeTable({ data }) {
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
  