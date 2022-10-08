export interface UpdatePurchaseDto {
  packSizeQuantity?: number;
  purchasedPackSizeQuantity?: number;
  pricePerPackSize?: number;
  issueUnitPerPackSize?: number;
  expiryDate?: Date;
  OrderId: string;
}
