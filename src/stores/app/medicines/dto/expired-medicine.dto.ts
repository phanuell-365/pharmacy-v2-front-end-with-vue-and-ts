export interface ExpiredMedicineDto {
  name: string;
  packSizeQuantity: number;
  issueUnitQuantity: number;
  issueUnitPerPackSize: number;
  issueUnitSellingPrice: number | string;
  expiryDate: string;
}
