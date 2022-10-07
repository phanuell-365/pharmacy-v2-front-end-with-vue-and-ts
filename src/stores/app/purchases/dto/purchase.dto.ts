export interface PurchaseDto {
  id: string;
  purchasedPackSizeQuantity: number;
  pricePerPackSize: string;
  totalPurchasePrice: string | number;
  issueUnitPerPackSize?: number;
  totalIssueUnitQuantity?: number;
  profitPerPackSize?: number;
  profitPerIssueUnit?: number;
  profitMarginPercentagePerPackSize?: number;
  profitMarginPercentagePerIssueUnit?: number;
  orderStatus?: string;
  OrderId?: string;
  purchaseDate: string;
  medicine: string;
  supplier: string;
  expiryDate: string;
  orderDate: string;
}
