export interface EntityWithUrl {
  url: string;
  [key: string]: any;
}

export function filterAndSort<T extends EntityWithUrl>(
  data: T[],
  query: string,
  sortKey: keyof T
): T[] {
  return data
    .filter(item =>
      String(item.name || item.title)
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === undefined || bVal === undefined) return 0;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return aVal - bVal;
      }

      return 0;
    });
}
