import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class PaymentSourceDto {
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsNotEmpty()
  @IsEmail()
  readonly customer_email: string;
}
