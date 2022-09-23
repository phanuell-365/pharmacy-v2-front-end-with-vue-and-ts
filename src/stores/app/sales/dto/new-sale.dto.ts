export interface NewSaleDto {
  issueUnitQuantity: number;
  MedicineId: string;
  CustomerId: string;
}

export interface NewSalesDto {
  sales: NewSaleDto[];
}
