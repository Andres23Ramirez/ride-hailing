import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from 'src/enviroments';
import { ConfigAppService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
    }),
  ],
  providers: [ConfigAppService],
  exports: [ConfigAppService],
})
export class AppConfigModule {}
