// entity ids are at the end of the api url. eg, swapi.info/api/people/1
export const extractIdFromUrl = (url: string): string | null => {
  const segments = url.split("/").filter(Boolean);
  return segments.at(-1) ?? null;
};
