import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from '../../service/category/categories.service'
import { createDTO, updateDTO } from 'src/products/dto/categories.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor( private categoryService: CategoriesService ){}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Query('limit') limit: number, @Query('offset') offset: number) {
    const success =  await this.categoryService.findAll({ limit, offset });
    return { body: success };
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const success = await this.categoryService.findOne(id);
    return { body: success };
  }

  @Post()
  create(@Body() body: createDTO) {
    return this.categoryService.create(body);
  }

  @Put(':id')
  update(@Body() body: updateDTO, @Param('id', ParseIntPipe) id: number) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}
