export interface SaleDto {
  id: string;
  medicine: string;
  customer: string;
  issueUnitQuantity: number;
  issueUnitPrice: string;
  status: string;
  saleDate: string;
  totalPrice: number;
}

export interface SalesDto {
  id: string;
  customer: string;
  medicines: string;
  saleDate: string;
  totalPrices: number;
}
