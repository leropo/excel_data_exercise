/**

 Validation Algorithm (Step‑by‑Step)
    Below is a clear algorithm you can implement in any language.

    1. Parse each string
    Split by  and check:
    • 	Every segment is digits only
    • 	No empty segments
    • 	First segment exists and is a digit
    If any fail → Format error

    2. Compare with previous item
    Let:

    Case 1 — Same length
    You must match all but the last segment:
    • 	If all previous segments match
    • 	And last segment is:
    • 	equal → allowed (leaf repetition)
    • 	or incremented by 1 → allowed
    • 	else → Hierarchy error

    Case 2 — Going deeper (curr longer than prev)
    Allowed only if:
    • 	 starts with all segments of 
    • 	And the first new segment is 1
    (because you always start a new child at 1)
    If not → Hierarchy error

    Case 3 — Going up (curr shorter than prev)
    Allowed only if:
    • 	 matches the prefix of 
    • 	And last segment is:
    • 	equal → allowed
    • 	or incremented by 1 → allowed
    If not → Hierarchy error

    Case 4 — Leaf rule
    If  ends with :
    • 	 must be:
    • 	exactly the same leaf
    • 	OR a shorter prefix (going up)
    If  is deeper → Leaf violation
*/

export function validateOutlineLevels(list: string[][], outlineLevelColumnIndex: number): any[] {
    const results = [];

    function parse(item: string) {
        return item.split(".").map(x => x.trim());
    }

    function isDigits(str: string) {
        return /^[0-9]+$/.test(str);
    }

    function prefixMatches(a: string[], b: string[]) {
        if (b.length > a.length) return false;
        for (let i = 0; i < b.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    for (let i = 0; i < list.length; i++) {
        const value = list[i][outlineLevelColumnIndex];
        const errors = [];

        // ---------------------------
        // Rule A — Format validation
        // ---------------------------
        const parts = parse(value);

        // could this part already include validator text instead of codes

        if (parts.length === 0) {
            // problem is empty string
            errors.push("Format error: empty string");
        }

        if (!isDigits(parts[0])) {
            // problem it starts with digit
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
            results.push({ index: i, value, errors });
            continue;
        }

        if (i === 0) {
            continue;
        }

        // ---------------------------
        // Rule B/C/D — Hierarchy rules
        // ---------------------------
        const prev = parse(list[i - 1][outlineLevelColumnIndex]);
        const curr = parts;

        const prevIsLeaf = prev[prev.length - 1] === "0";

        // Leaf rule: cannot go deeper after leaf
        if (prevIsLeaf && curr.length > prev.length) {
            errors.push("Leaf error: cannot descend after a leaf node ending in .0");
        }

        // Compare structure
        const minLen = Math.min(prev.length, curr.length);

        // Check prefix match for allowed transitions
        const prefixOK = prefixMatches(curr, prev.slice(0, minLen));

        if (!prefixOK) {
            //errors.push("Hierarchy error: invalid branch transition");
        } else {
            // Same level
            if (curr.length === prev.length) {
                const lastPrev = parseInt(prev[prev.length - 1], 10);
                const lastCurr = parseInt(curr[curr.length - 1], 10);

                if (!(lastCurr === lastPrev || lastCurr === lastPrev + 1)) {
                    errors.push("Hierarchy error: same-level index must repeat or increment by 1");
                }
            }

            // Going deeper    

             /*
            if (curr.length > prev.length) {
                const firstNew = parseInt(curr[prev.length], 10);
                if (firstNew !== 1) {
                    errors.push("Hierarchy error: when descending, new level must start at 1");
                }
            }
            */

            // Going up
            if (curr.length < prev.length) {
                const lastPrev = parseInt(prev[curr.length - 1], 10);
                const lastCurr = parseInt(curr[curr.length - 1], 10);

                if (!(lastCurr === lastPrev || lastCurr === lastPrev + 1)) {
                    errors.push("Hierarchy error: when ascending, last segment must repeat or increment by 1");
                }
            }
        }

        if (errors.length > 0) {
            results.push({ index: i, value, errors });
        }
    }

    return results;
}
