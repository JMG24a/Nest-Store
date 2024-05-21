import { BrandsService } from '../../service/brands/brand.service'
import { createDTO, updateDTO } from '../../dto/brand.dto'
import { ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common';

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandsService: BrandsService){}

  @Get()
  getBrands(){
    const success = this.brandsService.findAll({})
    return success
  }

  @Get(':id')
  getBrand(@Param('id', ParseIntPipe) id: number){
    const success = this.brandsService.findOne(id)
    return success
  }

  @Post()
  create(@Body() payload: createDTO){
    const success = this.brandsService.created(payload)
    return success
  }

  @Put(':id')
  update(@Body() body: updateDTO, @Param('id', ParseIntPipe) id: number) {
    return this.brandsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.brandsService.delete(id);
  }
}
