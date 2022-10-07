export interface MedicineStockDto {
  id: string;
  name: string;
  packSize: string;
  issueUnitQuantity: number;
  issueUnitPerPackSize: number;
  issueUnitPurchasePrice?: number;
  issueUnitSellingPrice: number;
  profitPerIssueUnit?: number;
  packSizeQuantity: number;
  packSizePurchasePrice?: number;
  packSizeSellingPrice?: number;
  profitPerPackSize?: number;
  expiryDate: string;
}
