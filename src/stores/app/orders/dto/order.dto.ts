export interface OrderDto {
  id: string;
  orderQuantity: number;
  status: string;
  medicine: string;
  supplier: string;
  orderDate: string;
}

export interface OrderDtoWithId {
  id: string;
  orderQuantity: number;
  status: string;
  MedicineId: string;
  SupplierId: string;
  orderDate: string;
}
