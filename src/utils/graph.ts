type System = {
  security: number;
  neighbors: number[];
};

export class Graph {
  protected systems: { [index: number]: System } = {};
  protected additionalConnections: { [index: number]: number[] } = {};
  protected avoidSystems: Set<number> = new Set();

  addSystem(system: number, security: number, neighbors: number[] = []) {
    this.systems[system] = { neighbors, security };
  }

  addChain(from: number, to: number) {
    if (this.systems[from].neighbors.indexOf(to) === -1) {
      this.systems[from].neighbors.push(to);
    }

    if (this.systems[to].neighbors.indexOf(from) === -1) {
      this.systems[to].neighbors.push(from);
    }
  }

  checkSystem(system: number) {
    return !!this.systems[system];
  }

  addAdditionalChain(from: number, to: number) {
    if (!this.additionalConnections[from]) {
      this.additionalConnections[from] = [];
    }

    if (!this.additionalConnections[to]) {
      this.additionalConnections[to] = [];
    }

    if (this.additionalConnections[from].indexOf(to) === -1) {
      this.additionalConnections[from].push(to);
    }

    if (this.additionalConnections[to].indexOf(from) === -1) {
      this.additionalConnections[to].push(from);
    }
  }

  avoidSystem(system: number) {
    this.avoidSystems.add(system);
  }

  neighbors(system) {
    if (this.avoidSystems.has(system)) {
      return [];
    }

    const additionalNeighbors = this.additionalConnections[system];

    if (additionalNeighbors) {
      return [...this.systems[system].neighbors, ...additionalNeighbors];
    }

    return this.systems[system].neighbors;
  }

  security(system) {
    return this.systems[system].security;
  }

  copy() {
    const g = new Graph();
    g.systems = this.systems;
    return g;
  }

  mergeWith(connections: number[][]) {
    const g = this.copy();
    connections.forEach(([origin, target]) => g.addAdditionalChain(origin, target));
    return g;
  }
}
