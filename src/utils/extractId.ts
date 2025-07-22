export const extractIdFromUrl = (url: string): string | null => {
  const segments = url.split("/").filter(Boolean);
  return segments.at(-1) ?? null;
};
