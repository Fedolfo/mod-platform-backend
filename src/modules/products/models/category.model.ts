export class CategoryModel {
  id?: string;
  name: string;
  image_url: string;
  status: 'active' | 'inactive';

  constructor(data: CategoryModel) {
    Object.assign(this, data);
  }
}
