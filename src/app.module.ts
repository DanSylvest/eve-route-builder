import { Module } from '@nestjs/common';
import { RouteModule } from './route/route.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [RouteModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
