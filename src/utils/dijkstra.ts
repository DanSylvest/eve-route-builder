import { Fibonacci_heap } from './fibonacci_heap';
import { Graph } from './graph';
import { StopCondition } from '../types';

const prefer_shortest = () => {
  return 1;
};

const prefer_safest = (graph, next_sys) => {
  if (graph.security(next_sys) < 0.45) {
    return 50000;
  }

  return 1;
};

const prefer_less_safe = (graph, next_sys) => {
  if (graph.security(next_sys) >= 0.45) {
    return 50000;
  }

  return 1;
};

const path = (prev, start, end) => {
  const queue = [];
  let system = end;

  while (system != start) {
    queue.unshift(system);

    if (!prev[system]) {
      return [];
    }
    system = prev[system];
  }

  queue.unshift(start);

  return queue;
};

const COST_FN = {
  secure: prefer_safest,
  insecure: prefer_less_safe,
  shortest: prefer_shortest,
};

export type SearchFlag = 'secure' | 'insecure' | 'shortest';
export const dijkstra = (graph: Graph, start: number, end: number, flag: SearchFlag = 'shortest') => {
  const prev = {};
  const costs = {};
  const entry = {};

  const remaining: Set<number> = new Set([end]);

  const weight_fn = COST_FN[flag];
  costs[start] = 0.0;

  const queue = new Fibonacci_heap();
  entry[start] = queue.enqueue(start, 0.0);

  while (queue.isValid()) {
    const system = queue.dequeue_min().get_value() as number;

    if (remaining.has(system)) {
      remaining.delete(system);
    }

    if (remaining.size === 0) {
      break;
    }

    const neighbors = graph.neighbors(system);

    for (const neighbor of neighbors) {
      if (prev[neighbor] != null) {
        continue;
      }

      const new_cost = costs[system] + weight_fn(graph, neighbor);

      if (costs[neighbor] != null && new_cost < costs[neighbor]) {
        costs[neighbor] = new_cost;
        prev[neighbor] = system;
        queue.decrease_key(entry[neighbor], costs[neighbor]);
      }

      if (costs[neighbor] == null) {
        costs[neighbor] = new_cost;
        prev[neighbor] = system;
        entry[neighbor] = queue.enqueue(neighbor, costs[neighbor]);
      }
    }
  }
  return path(prev, start, end);
};

const buildPath = (prev: Record<number, number>, start: number, end: number) => {
  const out: number[] = [];
  let system: number = end;

  while (system !== start) {
    out.unshift(system);

    if (prev[system] === undefined) {
      return [];
    }
    system = prev[system];
  }

  out.unshift(start);
  return out;
};

export const dijkstraMulti = (
  graph: Graph,
  start: number,
  ends: number[],
  flag: SearchFlag = 'secure',
  shouldStop?: StopCondition,
) => {
  const prev: Record<number, number> = {};
  const costs: Record<number, number> = {};
  const entry: Record<number, any> = {};

  const remaining = new Set<number>(ends);
  const foundTargets = new Set<number>();

  const weightFn = COST_FN[flag];

  costs[start] = 0.0;

  const queue = new Fibonacci_heap();
  entry[start] = queue.enqueue(start, 0.0);

  while (queue.isValid()) {
    const system = queue.dequeue_min().get_value() as number;

    if (remaining.has(system)) {
      remaining.delete(system);
      foundTargets.add(system);

      if (shouldStop?.({ ends, foundTargets, current: system })) {
        break;
      }
    }

    const neighbors = graph.neighbors(system);

    for (const neighbor of neighbors) {
      if (prev[neighbor] != null) {
        continue;
      }

      const newCost = costs[system] + weightFn(graph, neighbor);

      if (costs[neighbor] != null && newCost < costs[neighbor]) {
        costs[neighbor] = newCost;
        prev[neighbor] = system;
        queue.decrease_key(entry[neighbor], costs[neighbor]);
      }

      if (costs[neighbor] == null) {
        costs[neighbor] = newCost;
        prev[neighbor] = system;
        entry[neighbor] = queue.enqueue(neighbor, costs[neighbor]);
      }
    }
  }

  const routes: Record<number, number[]> = {};
  for (const end of foundTargets) {
    routes[end] = buildPath(prev, start, end);
  }

  return Object.keys(routes)
    .map((dest) => ({ origin: start.toString(), destination: dest, systems: routes[dest], success: true }))
    .sort((a, b) => a.systems.length - b.systems.length);
};
