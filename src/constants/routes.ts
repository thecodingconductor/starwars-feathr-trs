export const ROUTES = {
  HOME: '/',
  PEOPLE: '/people',
  PERSON_DETAIL: (id: string | number): `/people/${string}` => `/people/${id}`,

  PLANETS: '/planets',
  PLANET_DETAIL: (id: string | number): `/planets/${string}` => `/planets/${id}`,

  STARSHIPS: '/starships',
  STARSHIP_DETAIL: (id: string | number): `/starships/${string}` => `/starships/${id}`,
} as const;

export type RouteKey = keyof typeof ROUTES;


type LeafRoutes = {
  [K in RouteKey]: typeof ROUTES[K] extends string ? typeof ROUTES[K] : never
}[RouteKey];
export type RoutePaths = LeafRoutes;