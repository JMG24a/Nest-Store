import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { DataBaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../../entity/products.entity';



describe('ProductsService', () => {
  const typeOrmModule = TypeOrmModule.forFeature([Product])
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [typeOrmModule, DataBaseModule],
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
