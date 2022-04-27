import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { CategoriesService } from '../../service/category/categories.service';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/DTO/categories.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get()
  async list() {
    const success = await this.categoriesService.findAll();
    return { body: success };
  }

  @Get(':c_id/products/:id')
  async getOne(@Param('id') id: string, @Param('c_id') c_id: string) {
    return `product ${id} categories: ${c_id}`;
  }

  @Post()
  async create(@Body() payload: CreateCategoryDTO) {
    const success = await this.categoriesService.create(payload);
    return { body: success };
  }

  @Put(':id')
  async update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateCategoryDTO,
  ) {
    const success = await this.categoriesService.update(id, payload);
    return { body: success };
  }

  @Delete('id')
  async delete(@Param('id', MongoIdPipe) id: string) {
    const success = await this.categoriesService.delete(id);
    return { body: success };
  }
}
