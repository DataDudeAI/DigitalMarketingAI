export interface MarketingResponse {
  status: string;
  message: string;
  data?: any;
}

export interface ContentRequest {
  product: string;
  type?: string;
}