import { ProductsService } from '../../service/product/products.service';
import { ParseInt } from '../../../common/parse-int.pipe';
import { createDTO, updateDTO } from '../../DTO/products.dto';
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

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  //Nota es recomendable colocar las rutas estaticas antes que las dinamicas para que estas no choquen;
  @Get()
  @HttpCode(HttpStatus.OK)
  list(@Query('limit') limit: number, @Query('offset') offset: number) {
    const success = this.productsService.findAll({ limit, offset });
    return { body: success };
  }

  @Get(':id')
  getOne(@Param('id', ParseInt) id: number) {
    const success = this.productsService.findOne(id);
    return { body: success.user };
  }

  @Post(':id?')
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
}
