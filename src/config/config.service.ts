import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigAppService {
  constructor(private configService: ConfigService) {}

  get wompiSecretKey(): string {
    return this.configService.get<string>('WOMPI_PRIVATE_SECRET_KEY');
  }

  get wompiPublicKey(): string {
    return this.configService.get<string>('WOMPI_PUBLIC_SECRET_KEY');
  }

  get wompiBaseUrl(): string {
    return this.configService.get<string>('WOMPI_BASE_URL');
  }
}
