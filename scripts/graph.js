module.exports = {
  Graph: class Graph {
    systems = {};

    addSystem(system, security, neighbors = []) {
      this.systems[system] = { neighbors, security };
    }

    addChain(from, to) {
      if (this.systems[from].neighbors.indexOf(to) === -1) {
        this.systems[from].neighbors.push(to);
      }

      if (this.systems[to].neighbors.indexOf(from) === -1) {
        this.systems[to].neighbors.push(from);
      }
    }

    neighbors(system) {
      return this.systems[system].neighbors;
    }

    security(system) {
      return this.systems[system].security;
    }
  },
};
