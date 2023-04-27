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

  get host(): string {
    return this.configService.get<string>('HOST');
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get username(): string {
    return this.configService.get<string>('USERNAME');
  }

  get password(): string {
    return this.configService.get<string>('PASSWORD');
  }

  get database(): string {
    return this.configService.get<string>('DATABASE');
  }
}
