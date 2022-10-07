export interface MedicineOutOfStockDto {
  name: string;
  packSize: string;
  packSizeQuantity: number;
  packSizePurchasePrice: number;
  issueUnitQuantity: number;
  issueUnitPerPackSize: number;
  issueUnitSellingPrice: number;
  expiryDate: string;
}
