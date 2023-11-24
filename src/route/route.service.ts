import { Injectable } from '@nestjs/common';
import { Graph } from '../utils/graph';
import graphJson from '../assets/graph.json';
import { dijkstra, SearchFlag } from '../utils/dijkstra';
import additionalRoutes from './../assets/additionalRoutes.json';
import { AdditionalSystem } from "../types";

@Injectable()
export class RouteService {
  protected graph: Graph = new Graph();

  constructor() {
    this.load();
  }

  protected load() {
    for (const key in graphJson) {
      const { neighbors, security } = graphJson[key];
      this.graph.addSystem(parseInt(key), security, neighbors);
    }

    (additionalRoutes as AdditionalSystem[]).forEach(sys => {
      this.graph.addSystem(sys.systemId, sys.security, []);
      sys.neighbors.forEach(n => this.graph.addChain(sys.systemId, n));
    });
  }

  checkSystemExists(system: number) {
    return this.graph.checkSystem(system);
  }

  route(
    origin: number,
    destination: number,
    type: SearchFlag,
    connections?: number[][],
    avoid?: number[]
  ) {
    if (avoid && avoid.includes(origin) || avoid.includes(destination)) {
      return [];
    }

    const g = this.graph.copy();

    if (connections) {
      connections.forEach(([origin, target]) => g.addAdditionalChain(origin, target));
    }

    if (avoid) {
      avoid.forEach(sys => g.avoidSystem(sys));
    }

    return dijkstra(g, origin, destination, type).map((x) => parseInt(x));
  }
}
