import { Module } from '@nestjs/common';
import { ProductsController } from './controller/product/products.controller';
import { ProductsService } from './service/product/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
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
