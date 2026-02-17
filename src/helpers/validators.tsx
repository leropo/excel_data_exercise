export function validateOutlineLevels(list: string[][], outlineLevelColumnIndex: number): any[] {
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
            errors.push("Format error: empty string");
        }

        if (!isDigits(parts[0])) {
            // problem it does not have digits
            errors.push("Format error: must start with a digit");
        }

        for (const p of parts) {
            // problem not a number
            if (!isDigits(p)) {
                errors.push(`Format error: non-digit segment '${p}'`);
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
                errors.push("Hierarchy error: same length, length must among levels, unless we are in leaf node");
            }
            else if (prevIsLeaf && !prefixMatches(curr, prev)) {
                errors.push("Hierarchy error: leaf is not continued correctly");
            }
        }
        // shorter length for current means we have gone up in hiearchy
        else if (curr.length < prev.length) {
            if (prefixMatches(curr.slice(0, prev.length), prev)) {
                errors.push("Brachning error, current is higher level, but starts the same as previous");
            }
        }
        // current is longer curr.length > prev.length
        // you cannot continue if previous if leaf node
        else if (prevIsLeaf){
            errors.push("Leaf error: cannot descend after a leaf node ending in .0");
        }
        else if (!prefixMatches(curr.slice(0, prev.length), prev)){
            errors.push("Hierarchy error: next level is not continued correctly, it must start with previous one.");
        }


        if (errors.length > 0) {
            results.push({ index: convertIndexToExcel(i), value, errors });
        }

    }
    return results;
}
