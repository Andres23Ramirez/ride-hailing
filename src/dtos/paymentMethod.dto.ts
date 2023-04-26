import { IsNumber } from 'class-validator';

export class PaymentMethodDto {
  @IsNumber()
  readonly installments: number;
}
