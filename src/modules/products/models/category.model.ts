export class CategoryModel {
  id?: string;
  name: string;
  imageUrl: string;
  status: 'active' | 'inactive';

  constructor(data: CategoryModel) {
    Object.assign(this, data);
  }
}
