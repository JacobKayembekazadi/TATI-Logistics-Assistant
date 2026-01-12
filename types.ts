
export interface ShipmentDetails {
  product: string;
  quantity: string;
  destination: string;
  deliveryWindow: string;
}

export interface LogisticsResult {
  rawText: string;
  timestamp: string;
}

export interface CostBreakdown {
  name: string;
  value: number;
}
