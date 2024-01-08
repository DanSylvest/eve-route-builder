import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import nconf from 'nconf';

const setupConfig = () => {
  nconf.argv().env().file('project.config.json');
  nconf.env();

  nconf.defaults({
    port: 2001,
  });
};

async function bootstrap() {
  setupConfig();
  const port = nconf.get('PORT') || nconf.get('port');
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Start listening on port ${port}`);
}

bootstrap();
