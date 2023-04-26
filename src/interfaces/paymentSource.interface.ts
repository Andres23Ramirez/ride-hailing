export interface PaymentSourceResponse {
  data: {
    id: number;
    public_data: {
      bin: string;
      last_four: string;
      exp_month: string;
      exp_year: string;
      card_holder: string;
      validity_ends_at: string;
      type: string;
    };
    token: string;
    type: string;
    status: string;
    customer_email: string;
  };
  meta: Record<string, any>;
}
