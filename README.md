## Description

This is a tool for search route path for [EVE-ONLINE](https://www.eveonline.com/) game.

## How it works?

It does not use EVE-ONLINE [API](https://esi.evetech.net/ui/#/Routes/get_route_origin_destination)
it works same. It based and copied [dijkstra](https://github.com/esi/esi-routes/blob/master/esi_routes/dijkstra.py) algorithm.
Also, you are able to find source original source code [here](https://github.com/esi/esi-routes).

## Getting started

### Install dependencies

```bash
$ npm install
```

### Downloads
Download the latest files solar system tables from [here](https://www.fuzzwork.co.uk/dump/latest/). It should be in .csv format

Link for download [mapSolarSystems.csv](https://www.fuzzwork.co.uk/dump/latest/mapSolarSystems.csv)

Link for download [mapSolarSystemJumps.csv](https://www.fuzzwork.co.uk/dump/latest/mapSolarSystemJumps.csv)

These files should be placed in folder 'input'

### Generate new graph

```bash
$ npm run generateGraph
```

### And build and start

```bash
$ npm run build
$ npm run exec
```

## How to use

When server will start you need send POST request

```javascript
// URL http://yoursite/route/origin/destination
// with body
{
  type: 'secure' // secure|insecure|shortest
  connections: [] // [solarSystemFrom, solarSystemTo][] 
}

// connections example
const AMARR = 30002187;
const J212812 = 31001180;
{
  type: 'secure'
  connections: [[AMARR, J212812]]
}
```

## License

Nest is [MIT licensed](LICENSE).
