export interface TransactionResponse {
  data: {
    id: string;
    status: string;
    amount_in_cents: number;
    currency: string;
    customer_email: string;
    payment_method_type: string;
    payment_method_installments: number;
    reference: string;
    receipt: null | string;
    authorization_entity: null | string;
    created_at: string;
    updated_at: string;
    amount: number;
    net_amount: number;
    paid_at: string;
    payment_source_id: number;
    customer_data: {
      id: string;
      email: string;
      full_name: string;
      phone_number: string;
      metadata: object | null;
      default_payment_source_id: string;
      created_at: string;
      updated_at: string;
      merchant_customer_id: null | string;
      customer_location: null | string;
    };
  };
}
