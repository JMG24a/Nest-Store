import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controller/product/products.controller';
import { ProductsService } from './service/product/products.service';
import { BrandsService } from './service/brands/brand.service';
import { BrandsController } from './controller/brands/brand.controller';
import { CategoriesController } from './controller/category/categories.controller';
import { CategoriesService } from './service/category/categories.service';
import { Product as ProductEntity } from './entity/products.entity'
import { Category as categoryEntity } from './entity/categories.entity'
import { Brand as brandEntity } from './entity/brands.entity'

const typeOrmModule = TypeOrmModule.forFeature([ProductEntity, brandEntity, categoryEntity])

@Module({
  imports: [typeOrmModule],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, CategoriesService, BrandsService],
  exports: [ProductsService, typeOrmModule],
})
export class ProductsModule {}

/** Asi sería un export module ciclico
 *
import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ProductsController } from './controller/product/products.controller';
import { ProductsService } from './service/product/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
  imports: [forwardRef(() => UsersModule)],
})
export class ProductsModule {}


  ** Asi se injecta en el servicio

  @Injectable()
  export class CatsService {
  constructor(
    @Inject(forwardRef(() => CommonService))
    private commonService: CommonService,
  ) {}
}

 */
