export class ProductModel {
  id?: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  dimensions: string;
  original_price: number;
  discount_percent: number;
  lead_time: string;
  main_image_url: string;
  gallery_images: string[];
  rating: number;
  status: 'active' | 'inactive';

  constructor(data: ProductModel) {
    Object.assign(this, data);
  }
}
