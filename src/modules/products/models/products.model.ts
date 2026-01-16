export class ProductModel {
  id?: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  dimensions: string;
  originalPrice: number;
  discountPercent: number;
  leadTime: string;
  mainImageUrl: string;
  galleryImages: string[];
  rating: number;
  status: 'active' | 'inactive';

  constructor(data: ProductModel) {
    Object.assign(this, data);
  }
}
