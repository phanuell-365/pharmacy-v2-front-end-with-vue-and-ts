export interface PurchaseDto {
  id: string;
  packSizeQuantity: number;
  pricePerPackSize: number;
  totalPackSizePrice: number;
  OrderId?: string;
  purchaseDate: string;
  medicine: string;
  supplier: string;
  orderDate: string;
}
