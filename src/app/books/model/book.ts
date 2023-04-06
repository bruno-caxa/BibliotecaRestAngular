import { Category } from './category';

export class Book {
  id: number = 0;
  title: string = '';
  image: string = '';
  category: Category = new Category();
  publishingCompany: string = '';
  author: string = '';
  totalPages: number = 0;
  unitPrice: number = 0;
  description: string = '';
}
