import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigAppService {
  constructor(private configService: ConfigService) {}

  get secretKey(): string {
    return this.configService.get<string>('PRIVATE_SECRET_KEY');
  }

  get publicKey(): string {
    return this.configService.get<string>('PUBLIC_SECRET_KEY');
  }

  get baseUrl(): string {
    return this.configService.get<string>('BASE_URL');
  }
}
