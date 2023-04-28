import { Observable, of } from 'rxjs';
import { PaymentSourceResponse } from '../interfaces/paymentSource.interface';

export const expectedPaymentSourceResponse: Observable<PaymentSourceResponse> =
  of({
    data: {
      id: 987654,
      public_data: {
        bin: '453269',
        last_four: '9123',
        exp_month: '05',
        exp_year: '2026',
        card_holder: 'John Doe',
        validity_ends_at: '2026-05-31T23:59:59Z',
        type: 'Visa',
      },
      token: 'tok_abcdefghijk1234567890',
      type: 'credit_card',
      status: 'active',
      customer_email: 'johndoe@example.com',
    },
    meta: {
      source: 'web',
      timestamp: '2023-04-28T14:30:00Z',
      transaction_id: 'tx_abcdef1234567890',
      notes: 'This is a test transaction',
    },
  });
