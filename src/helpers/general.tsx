export function flattenField<T extends { children: T[] }, K extends keyof T>(
    nodes: T[],
    field: K
  ): T[K][] {
    const result: T[K][] = [];
  
    function walk(list: T[]) {
      for (const node of list) {
        result.push(node[field]);
        if (Array.isArray(node.children)) {
          walk(node.children as T[]);
        }
      }
    }  
    walk(nodes);
    return result;
}
  