import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global() // 声明为全局模块，，这样只需要在 AppModule 里引入，别的模块不用引入也可以注入 RedisService 了
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory(ConfigService: ConfigService) {
        const client = createClient({
          socket: {
            host: ConfigService.get('redis_server_host'),
            port: ConfigService.get('redis_server_port'),
          },
          database: ConfigService.get('redis_server_db'),
        });
        await client.connect();
        return client;
      },
      inject: [ConfigService],
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
