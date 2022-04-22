import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  @Get()
  init(): string {
    return 'categories home';
  }

  @Get(':c_id/products/:id')
  list(@Param('id') id: string, @Param('c_id') c_id: string): string {
    return `product ${id} categories: ${c_id}`;
  }
}
