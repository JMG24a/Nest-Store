import { ProductsService } from '../../service/product/products.service';
import { ParseInt } from '../../../common/parse-int.pipe';
import { createDTO, updateDTO } from '../../dto/products.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { OptionsFilter } from 'src/utils/filter.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  //Nota es recomendable colocar las rutas estaticas antes que las dinamicas para que estas no choquen;
  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Query() options: OptionsFilter) {
    const success =  await this.productsService.findAll(options);
    return { body: success };
  }

  @Get(':id')
  async getOne(@Param('id', ParseInt) id: number) {
    const success = await this.productsService.findOne(id);
    return { body: success };
  }

  @Post()
  create(@Body() body: createDTO) {
    return this.productsService.create(body);
  }

  @Put(':id')
  update(@Body() body: updateDTO, @Param('id', ParseIntPipe) id: number) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }

  @Put(':id/category/:categoryId')
  addCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
