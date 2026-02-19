import { TableRow } from "../types/data";
import { useTranslation } from "../i18n/TranslationContext";

export function DetailedInfo({ node, isExpanded }: { node: TableRow, isExpanded: boolean }) {
    const { t } = useTranslation();
    return (
        <>
            <tr className="row">
                <td>{t.details.description}</td>
                <td colSpan={3}>{node.data.description}</td>
            </tr>
            <tr className="row">
                <td>{t.details.quantity_type}</td>
                <td>{node.data.quantity_type}</td>
                <td>{t.details.quantity_unit}</td>
                <td>{node.data.quantity_unit}</td>
            </tr>
            {isExpanded &&       
            <>    
                <tr className="row">
                    <td>{t.details.quantityFormula}</td>
                    <td colSpan={3}>{node.data.quantity_formula}</td>
                </tr>
                
                <tr className="row">
                    <td>{t.details.elementQuery}</td>
                    <td colSpan={3}>{node.data.element_query}</td>
                </tr>
            </>}
        </>
    );
}