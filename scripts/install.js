const fs = require('fs');
const csvtojson = require('csvtojson');
const { Graph } = require('./graph');

const load = async (name) => {
  const text = fs.readFileSync(`${__dirname}/../input/${name}.csv`, 'utf8');
  return await csvtojson().fromString(text);
};

const install = async () => {
  const mapSolarSystems = await load('mapSolarSystems');
  const mapSolarSystemJumps = await load('mapSolarSystemJumps');

  const graph = new Graph();
  mapSolarSystems.forEach(({ solarSystemID, security }) => graph.addSystem(solarSystemID | 0, parseFloat(security)));

  mapSolarSystemJumps.forEach(({ fromSolarSystemID, toSolarSystemID }) =>
    graph.addChain(fromSolarSystemID | 0, toSolarSystemID | 0),
  );

  fs.writeFileSync(`${__dirname}/../src/assets/graph.json`, JSON.stringify(graph.systems, undefined, 3));
};

install();
