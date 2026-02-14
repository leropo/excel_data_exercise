import { Row } from "./Row";

export default function TreeTable({ data }) {
    return (
      <table className="data-table">
        <thead>
            <th>
              Code
            </th>  
            <th>
             	Name
            </th> 
            <th>
             	Description
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
  