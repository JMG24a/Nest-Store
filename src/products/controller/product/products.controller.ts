import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
  Query,
} from '@nestjs/common';

import { ProductsService } from '../../service/product/products.service';
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from '../../DTO/products.dto';
import { MongoIdPipe } from '../../../common/mongo-id.pipe';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //Nota es recomendable colocar las rutas estaticas antes que las dinamicas para que estas no choquen;
  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Query() params: FilterProductDTO) {
    const success = await this.productsService.findAll(params);
    return { body: success };
  }

  @Get(':id')
  async getOne(@Param('id', MongoIdPipe) id: string) {
    const success = await this.productsService.findOne(id);
    return { body: success };
  }

  @Post(':id?')
  async create(@Body() body: CreateProductDTO) {
    const success = await this.productsService.create(body);
    return { body: success };
  }

  @Put(':id')
  async update(@Body() body: UpdateProductDTO, @Param('id') id: string) {
    const success = await this.productsService.update(id, body);
    return { body: success };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const success = await this.productsService.delete(id);
    return { body: success };
  }
}
