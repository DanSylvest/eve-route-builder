import { Body, Controller, Param, Post } from '@nestjs/common';
import { SearchFlag } from '../utils/dijkstra';
import { RouteService } from './route.service';
import { SEARCH_TYPES } from './constants';

@Controller('route')
export class RouteController {
  constructor(private readonly routeService: RouteService) {}

  @Post(':origin/:destination')
  route(
    @Param('origin') origin: number,
    @Param('destination') destination: number,
    @Body('type') type: SearchFlag,
    @Body('connections') connections?: number[][],
  ): number[] | string {
    if (!this.routeService.checkSystemExists(origin)) {
      return `Origin solar system - ${origin} is not exists.`;
    }

    if (!this.routeService.checkSystemExists(destination)) {
      return `Destination solar system - ${destination} is not exists.`;
    }

    if (!SEARCH_TYPES.includes(type)) {
      return `Route type is incorrect ${type} - type should be one of (${SEARCH_TYPES.join('/')}).`;
    }

    return this.routeService.route(origin, destination, type, connections);
  }
}
