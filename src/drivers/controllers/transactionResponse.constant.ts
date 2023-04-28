import { Observable, of } from 'rxjs';
import { TransactionResponse } from '../interfaces/transactionResponse.interface';

export const expectedResult: Observable<TransactionResponse> = of({
  data: {
    id: 'some-id',
    status: 'success',
    amount_in_cents: 1000,
    currency: 'USD',
    customer_email: 'test@example.com',
    payment_method_type: 'card',
    payment_method_installments: 1,
    reference: 'some-reference',
    receipt: null,
    authorization_entity: null,
    created_at: '2022-04-28T10:00:00Z',
    updated_at: '2022-04-28T10:05:00Z',
    amount: 10,
    net_amount: 9,
    paid_at: '2022-04-28T10:05:00Z',
    payment_source_id: 123,
    customer_data: {
      id: 'customer-id',
      email: 'test@example.com',
      full_name: 'John Doe',
      phone_number: '1234567890',
      metadata: null,
      default_payment_source_id: 'default-payment-source-id',
      created_at: '2022-04-28T09:00:00Z',
      updated_at: '2022-04-28T09:00:00Z',
      merchant_customer_id: null,
      customer_location: null,
    },
  },
});
