export interface SaleDto {
  id: string;
  medicine: string;
  customer?: string;
  issueUnitQuantity: number;
  issueUnitPrice: string;
  status: string;
  saleDate: string;
  totalPrice: number | string;
  amountReceived?: number | string;
}

export interface SalesDto {
  id: string;
  customer: string;
  medicines: string;
  saleDate: string;
  totalPrices: number | string;
  amountReceived: number | string;
}

export interface SalesWithCustomerIdDto {
  id: string;
  CustomerId: string;
  medicines: string;
  saleDate: string;
  totalPrices: number | string;
  amountReceived: number | string;
}

export interface SalesWithIdsDto {
  id: string;
  MedicineId: string;
  CustomerId: string;
  issueUnitQuantity: number;
  issueUnitPrice: number | string;
  status: string;
  saleDate: string;
  totalPrice: number | string;
  amountReceived?: number | string;
}
