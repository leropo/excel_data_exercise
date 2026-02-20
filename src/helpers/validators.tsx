import type { TranslationKeys } from '../i18n/translations/en';

export function validateOutlineLevels(list: string[][], outlineLevelColumnIndex: number, t: TranslationKeys): any[] {
    const results = [];

    function parse(item: string) {
        return item.split(".").map(x => x.trim());
    }

    function isDigits(str: string) {
        return /^[0-9]+$/.test(str);
    }

    /* in error display we would like to show index as in xlxs file
       this means 1 is added because of header
       and 1 is added because of indexing from zero
    */
    function convertIndexToExcel(index: number) {
        return index + 2;
    }

    function prefixMatches(current: string[], previous: string[]) {
        // if current is shorter, this indicates a new branch will be taken
        // only check if current is a prefix on previous
        // since current should not be somethign different 
        // we have entered a completely new branch,
        if (previous.length != current.length) {
            return false;
        }
        for (let i = 0; i < previous.length; i++) {
            if (current[i] !== previous[i]) return false;
        }
        return true;
    }

    for (let i = 0; i < list.length; i++) {
        const value = list[i][outlineLevelColumnIndex];
        const errors = [];
        const parts = parse(value);

        // ---------------------------
        //  Data format rules
        // ---------------------------

        if (parts.length === 0) {
            // problem is empty string
            errors.push(t.dialog.errorDescription.emptyString);
        }

        if (!isDigits(parts[0])) {
            // problem it does not have digits
            errors.push(t.dialog.errorDescription.notDigit);
        }

        for (const p of parts) {
            // problem not a number
            if (!isDigits(p)) {
                errors.push(`${t.dialog.errorDescription.notDigit} '${p}'`);
            }
        }

        // If format is broken, skip hierarchy checks
        if (errors.length > 0) {
            results.push({ index: convertIndexToExcel(i), value, errors });
            continue;
        }

        if (i === 0) {
            continue;
        }

        // ---------------------------
        //  Hierarchy rules
        // ---------------------------
        const prev = parse(list[i - 1][outlineLevelColumnIndex]);
        const curr = parts;

        const prevIsLeaf = prev[prev.length - 1] === "0";

        // same length is only possible, if previous node is leaf 
        if (curr.length == prev.length) {
            if (!prevIsLeaf) {
                errors.push(t.dialog.errorDescription.sameLength);
            }
            else if (prevIsLeaf && !prefixMatches(curr, prev)) {
                errors.push(t.dialog.errorDescription.leafContinuation);
            }
        }
        // shorter length for current means we have gone up in hiearchy
        else if (curr.length < prev.length) {
            if (prefixMatches(curr.slice(0, prev.length), prev)) {
                errors.push(t.dialog.errorDescription.hierarchyRepeated)
            }
        }
        // current is longer curr.length > prev.length
        // you cannot continue if previous if leaf node
        else if (prevIsLeaf){
            errors.push(t.dialog.errorDescription.leafDescend);
        }
        else if (!prefixMatches(curr.slice(0, prev.length), prev)){
            errors.push(t.dialog.errorDescription.levelContinuation)
        }


        if (errors.length > 0) {
            results.push({ index: convertIndexToExcel(i), value, errors });
        }

    }
    return results;
}
