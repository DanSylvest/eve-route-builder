import { Graph } from './graph';

const addSystems = (graph: Graph) => {
  graph.addSystem(100, 1);
  graph.addSystem(101, 1);
  graph.addSystem(102, 1);
  graph.addSystem(1000, 1);
};

describe('graph', () => {
  let graph: Graph;

  beforeEach(() => {
    graph = new Graph();
  });

  it('add systems', () => {
    addSystems(graph);
    expect(graph).toMatchSnapshot();
  });

  it('add chains and check neighbors', () => {
    addSystems(graph);
    graph.addChain(100, 101);
    graph.addChain(100, 102);
    graph.addChain(101, 102);
    expect(graph.neighbors(100)).toEqual([101, 102]);
    expect(graph.neighbors(101)).toEqual([100, 102]);
    expect(graph.neighbors(102)).toEqual([100, 101]);
  });

  it('check system exists', () => {
    addSystems(graph);
    expect(graph.checkSystem(100)).toEqual(true);
    expect(graph.checkSystem(-1)).toEqual(false);
  });

  it('add additional chain', () => {
    addSystems(graph);
    graph.addChain(100, 101);
    graph.addAdditionalChain(100, 1000);
    expect(graph.neighbors(100)).toEqual([101, 1000]);
  });

  it('check security', () => {
    addSystems(graph);
    expect(graph.security(100)).toEqual(1);
  });

  it('should copy', () => {
    addSystems(graph);
    expect(graph.copy()).toMatchSnapshot();
  });

  it('merge with additional connections', () => {
    addSystems(graph);
    expect(graph.mergeWith([[100, 1000]])).toMatchSnapshot();
  });
});
