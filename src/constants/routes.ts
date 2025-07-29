export const ROUTES = {
  HOME: "/",
  PEOPLE: "/people",
  PERSON_DETAIL: (id: string | number): `/people/${string}` => `/people/${id}`,

  PLANETS: "/planets",
  PLANET_DETAIL: (id: string | number): `/planets/${string}` =>
    `/planets/${id}`,

  STARSHIPS: "/starships",
  STARSHIP_DETAIL: (id: string | number): `/starships/${string}` =>
    `/starships/${id}`,
} as const;

export type RouteKey = keyof typeof ROUTES;


// Extract only the static route paths (i.e. values that are plain strings) from your ROUTES object — and discard any that are functions.
type LeafRoutes = {
  [K in RouteKey]: (typeof ROUTES)[K] extends string
    ? (typeof ROUTES)[K]
    : never;
}[RouteKey];
export type RoutePaths = LeafRoutes;
