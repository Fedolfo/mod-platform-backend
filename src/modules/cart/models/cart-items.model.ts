export interface CartItemsModel {
  id?: string;
  cart_id: string;
  product_id: string;
  quantity: number;
  unitPriceSnapshot?: number;
}
