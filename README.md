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

```TypeScript
 @Body('origin') origin: number,
 @Body('destinations') destinations: number[],
 @Body('flag') flag: SearchFlag,
 @Body('connections') connections?: string[],
 @Body('avoid') avoid?: number[],
 @Body('count') count?: number,

// URL http://yoursite/route/findClosest
// with body
{
    "origin": 31001027,
    "flag": "shortest",
    "connections": [
        "31001027|31000005",
        "31001027|30045348",
        "31001027|31000277",
        "31000005|31001027",
        "30045348|31001027",
        "30045348|30003127",
        "31000277|31001027",
        "31000277|30003881",
        "31000277|30000028",
        "31000277|30003127",
        "30003127|30045348",
        "30003127|31000277",
        "30003127|30001442",
        "30001442|30003127",
        "30001442|30000028",
        "30003881|31000277",
        "30000028|31000277",
        "30000028|30001442",
        "30000028|30000186",
        "30000186|30000028",
        "30000186|31002170"
    ],
    "avoid": [
        31000277
    ],
    "destinations": [
        31000005,
        30003127,
        30001442,
        30003881,
        31002170
    ],
    "count": 1
}


```




## License

[MIT licensed](LICENSE).
