import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';
import { PaymentMethodDto } from './paymentMethod.dto';

export class TransactionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly amount_in_cents: number;

  @IsNotEmpty()
  @IsString()
  readonly currency: string;

  @IsNotEmpty()
  @IsEmail()
  readonly customer_email: string;

  payment_method?: PaymentMethodDto;

  @IsNotEmpty()
  @IsString()
  readonly reference: string;

  @IsNotEmpty()
  @IsNumber()
  readonly payment_source_id: number;
}
