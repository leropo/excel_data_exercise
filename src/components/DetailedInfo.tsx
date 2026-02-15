export function DetailedInfo({ node, depth }) {
    return (
        <>
            <tr className="row">
                <td>Description</td>
                <td colSpan={3}>{node.data[3]}</td>
            </tr>
            <tr className="row">
                <td>Quantity</td>
                <td>{node.data[4]}</td>
                <td>{node.data[5]}</td>
                <td>{node.data[6]}</td>
            </tr>

            {node.data[7].length > 0 &&            
             <tr className="row">
                <td>Element Query</td>
                <td colSpan={3}>{node.data[7]}</td>
            </tr>}


        </>
    );
}