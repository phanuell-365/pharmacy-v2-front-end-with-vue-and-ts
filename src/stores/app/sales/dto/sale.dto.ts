export interface SaleDto {
  id: string;
  medicine: string;
  customer?: string;
  issueUnitQuantity: number;
  issueUnitPrice: string;
  status: string;
  saleDate: string;
  totalPrice: number;
  amountReceived?: number;
}

export interface SalesDto {
  id: string;
  customer: string;
  medicines: string;
  saleDate: string;
  totalPrices: number;
  amountReceived: number;
}

export interface SalesWithCustomerIdDto {
  id: string;
  CustomerId: string;
  medicines: string;
  saleDate: string;
  totalPrices: number;
  amountReceived: number;
}

export interface SalesWithIdsDto {
  id: string;
  MedicineId: string;
  CustomerId: string;
  issueUnitQuantity: number;
  issueUnitPrice: number;
  status: string;
  saleDate: string;
  totalPrice: number;
  amountReceived?: number;
}
