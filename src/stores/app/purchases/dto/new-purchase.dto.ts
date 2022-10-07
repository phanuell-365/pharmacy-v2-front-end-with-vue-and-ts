export interface NewPurchaseDto {
  purchasedPackSizeQuantity: number;
  pricePerPackSize: number;
  issueUnitPerPackSize: number;
  expiryDate: Date;
  OrderId: string;
}
