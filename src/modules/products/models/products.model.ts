export class ProductModel {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  dimensions: string;
  lead_time: string;
  main_image_url: string;
  gallery_images: string[];

  constructor(data: ProductModel) {
    Object.assign(this, data);
  }
}
