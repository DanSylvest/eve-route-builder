import { Test, TestingModule } from '@nestjs/testing';
import { RouteController } from './route.controller';
import { RouteService } from './route.service';

const AMARR = 30002187;
const BHIZHEBA = 30002282;
const PERIMETER = 30000144;
const J212812 = 31001180;

describe('RouteController', () => {
  let controller: RouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RouteController],
      providers: [RouteService],
    }).compile();

    controller = module.get<RouteController>(RouteController);
  });

  it('should be success', () => {
    expect(controller.route(AMARR.toString(), PERIMETER.toString(), 'secure')).toEqual([
      30002187, 30003522, 30003523, 30003525, 30003548, 30003545, 30002994, 30002991, 30002964, 30002963, 30002970,
      30002971, 30002972, 30002974, 30002969, 30002973, 30000002, 30000005, 30000004, 30002509, 30002510, 30002526,
      30002529, 30002568, 30002545, 30002543, 30002053, 30002049, 30002048, 30002682, 30002681, 30002641, 30002634,
      30002633, 30004970, 30004972, 30002761, 30002764, 30002765, 30002768, 30002803, 30002805, 30002791, 30000139,
      30000144,
    ]);
  });

  it('should be success if insecure', () => {
    expect(controller.route(AMARR.toString(), PERIMETER.toString(), 'insecure')).toEqual([
      30002187, 30005038, 30005036, 30005035, 30005030, 30005031, 30005236, 30005237, 30005239, 30005241, 30004120,
      30004118, 30004117, 30004119, 30004121, 30004136, 30003480, 30003479, 30003478, 30002730, 30002729, 30002727,
      30002725, 30002726, 30002728, 30004992, 30004991, 30004990, 30005008, 30004999, 30005000, 30004979, 30004980,
      30004985, 30002807, 30002809, 30002813, 30001376, 30001379, 30000143, 30000144,
    ]);
  });

  it('should be success if shortest', () => {
    expect(controller.route(AMARR.toString(), PERIMETER.toString(), 'shortest')).toEqual([
      30002187, 30003491, 30002193, 30002197, 30004081, 30004083, 30005192, 30005196, 30000134, 30000132, 30000138,
      30000142, 30000144,
    ]);
  });

  it('should be with additional connections', () => {
    const additional = [[BHIZHEBA.toString(), J212812.toString()].join('|')];
    expect(controller.route(J212812.toString(), AMARR.toString(), 'secure', additional)).toEqual([31001180, 30002282, 30002187]);
  });

  it('should be if no connection', () => {
    expect(controller.route(J212812.toString(), AMARR.toString(), 'secure')).toEqual([]);
  });

  it('should returns error', () => {
    expect(controller.route(`100`, AMARR.toString(), 'secure')).toEqual('Origin solar system - 100 is not exists.');
    expect(controller.route(AMARR.toString(), `100`, 'secure')).toEqual('Destination solar system - 100 is not exists.');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(controller.route(AMARR.toString(), PERIMETER.toString(), 'xxx')).toEqual(
      'Route type is incorrect xxx - type should be one of (secure/insecure/shortest).',
    );
  });
});
