import { TableRow } from "../types/types";

export function DetailedInfo({ node, depth }: { node: TableRow; depth: number }) {
    return (
        <>
            <tr className="row">
                <td>Description</td>
                <td colSpan={3}>{node.data.description}</td>
            </tr>
            <tr className="row">
                <td>Quantity</td>
                <td>{node.data.quantity_type}</td>
                <td>{node.data.quantity_unit}</td>
                <td>{node.data.quantity_formula}</td>
            </tr>

            {node.data.element_query.length > 0 &&            
             <tr className="row">
                <td>Element Query</td>
                <td colSpan={3}>{node.data.element_query}</td>
            </tr>}


        </>
    );
}