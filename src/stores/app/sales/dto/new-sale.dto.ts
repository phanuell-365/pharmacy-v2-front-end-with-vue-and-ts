export interface NewSaleDto {
  issueUnitQuantity: number;
  amountReceived: number;
  MedicineId: string;
  CustomerId: string;
}

export interface NewSalesDto {
  sales: NewSaleDto[];
}
