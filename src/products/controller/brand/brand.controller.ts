import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateBrandDTO } from 'src/products/DTO/brand.dto';
import { BrandService } from 'src/products/service/brand/brand.service';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  async list() {
    const success = await this.brandService.findAll();
    return { body: success };
  }

  @Post()
  async create(@Body() payload: CreateBrandDTO) {
    const success = await this.brandService.create(payload);
    return { body: success };
  }
}
