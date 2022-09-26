export interface StockDto {
  id: string;
  issueUnitPrice: number;
  issueUnitPerPackSize?: number;
  packSizeQuantity: 0;
  packSize?: string;
  packSizePrice: number;
  issueQuantity?: 0;
  expirationDate: string;
  medicine: string;
}
