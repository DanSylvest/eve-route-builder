export interface AdditionalSystem {
  name: string;
  systemId: number;
  security: number;
  neighbors: number[];
}

export type Route = {
  origin: string;
  destination: string;
};

export type RouteResult = { systems: number[]; success: boolean } & Route;
