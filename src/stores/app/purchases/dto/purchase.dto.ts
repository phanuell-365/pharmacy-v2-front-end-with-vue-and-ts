export interface PurchaseDto {
  id: string;
  packSizeQuantity: number;
  pricePerPackSize: string;
  totalPackSizePrice: string | number;
  orderStatus: string;
  OrderId?: string;
  purchaseDate: string;
  medicine: string;
  supplier: string;
  orderDate: string;
}
