import { Injectable } from '@nestjs/common';
import { Graph } from '../utils/graph';
import graphJson from '../assets/graph.json';
import { dijkstra, SearchFlag } from '../utils/dijkstra';

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
  }

  checkSystemExists(system: number) {
    return this.graph.checkSystem(system);
  }

  route(origin: number, destination: number, type: SearchFlag, connections?: number[][]) {
    const g = connections ? this.graph.mergeWith(connections) : this.graph;

    return dijkstra(g, origin, destination, type).map((x) => parseInt(x));
  }
}
