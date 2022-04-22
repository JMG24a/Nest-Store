import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private categories = ['manzana', 'arroz', 'pera'];

  findAll() {
    return this.categories;
  }
}
