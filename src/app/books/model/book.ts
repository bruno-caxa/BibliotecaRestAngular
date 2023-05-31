import { Category } from './category';
import { ImageReference } from './image-reference';

export class Book {
  id: number = 0;
  title: string = '';
  image = new ImageReference();
  imageUrl: string = '';
  category: Category = new Category();
  publishingCompany: string = '';
  author: string = '';
  totalPages: number = 0;
  unitPrice: number = 0;
  description: string = '';
}
