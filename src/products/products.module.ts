import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//controllers
import { ProductsController } from './controller/product/products.controller';
//services
import { ProductsService } from './service/product/products.service';
import { BrandController } from './controller/brand/brand.controller';
import { BrandService } from './service/brand/brand.service';
//schemas
import { Categories, CategorySchema } from './entity/categories';
import { Products, ProductSchema } from './entity/products.entity';
import { CategoriesController } from './controller/category/categories.controller';
import { CategoriesService } from './service/category/categories.service';
import { Brands, BrandSchema } from './entity/brand.entity';

@Module({
  controllers: [ProductsController, CategoriesController, BrandController],
  providers: [ProductsService, CategoriesService, BrandService],
  exports: [ProductsService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Products.name,
        schema: ProductSchema,
      },
      {
        name: Categories.name,
        schema: CategorySchema,
      },
      {
        name: Brands.name,
        schema: BrandSchema,
      },
    ]),
  ],
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
