import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppConfigModule } from 'src/config/config.module';
import { ConfigAppService } from 'src/config/config.service';

@Global()
@Module({
  imports: [
    AppConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      useFactory: (configAppService: ConfigAppService) => ({
        type: 'postgres',
        host: configAppService.host,
        port: configAppService.port,
        username: configAppService.username,
        password: configAppService.password,
        database: configAppService.database,
        synchronize: true,
      }),
      inject: [ConfigAppService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
