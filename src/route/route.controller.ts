import { Body, Controller, Param, Post } from '@nestjs/common';
import { SearchFlag } from '../utils/dijkstra';
import { RouteService } from './route.service';
import { SEARCH_TYPES } from './constants';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post(':origin/:destination')
  route(
    @Param('origin') origin: string,
    @Param('destination') destination: string,
    @Body('flag') flag: SearchFlag,
    @Body('connections') connections?: string[],
    @Body('avoid') avoid?: number[],
  ): number[] | string {
    if (!this.routeService.checkSystemExists(parseInt(origin))) {
      return `Origin solar system - ${ origin } is not exists.`;
    }

    if (!this.routeService.checkSystemExists(parseInt(destination))) {
      return `Destination solar system - ${ destination } is not exists.`;
    }

    if (!SEARCH_TYPES.includes(flag)) {
      return `Route flag is incorrect ${ flag } - type should be one of (${ SEARCH_TYPES.join('/') }).`;
    }

    const parsedConnections = connections.map(x => x.split('|').map(x => parseInt(x)));

    return this.routeService.route(parseInt(origin), parseInt(destination), flag, parsedConnections, avoid);
  }
}
