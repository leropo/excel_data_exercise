import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";

export function DetailedInfo({ node }: { node: TableRow }) {
    const { t } = useTranslation();
    return (
        <>
            <tr className="row">
                <td>{t.details.description}</td>
                <td colSpan={3}>{node.data.description}</td>
            </tr>
            <tr className="row">
                <td>{t.details.quantity}</td>
                <td>{node.data.quantity_type}</td>
                <td>{node.data.quantity_unit}</td>
                <td>{node.data.quantity_formula}</td>
            </tr>

            {node.data.element_query.length > 0 &&            
             <tr className="row">
                <td>{t.details.elementQuery}</td>
                <td colSpan={3}>{node.data.element_query}</td>
            </tr>}


        </>
    );
}