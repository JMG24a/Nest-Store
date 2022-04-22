import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from 'src/products/entity/products.entity';
import { createDTO, updateDTO } from '../../DTO/products.dto';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'bla bla',
      price: 122,
      image: '',
      stock: 12,
    },
  ];

  findAll(options) {
    if (options.limit || options.offset) {
      return { body: this.products };
    }
    return this.products;
  }

  findOne(id: number) {
    const index = this.products.findIndex((item) => item.id == id);
    if (index === -1) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const user = this.products[index];
    return { index, user };
  }

  create(payload: createDTO) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: updateDTO) {
    const { index } = this.findOne(id);
    let update = this.products[index];
    update = { ...update, ...payload };
    this.products[index] = update;
    return this.products[index];
  }

  delete(id: number) {
    const user = this.findOne(id);
    this.products.splice(user.index, 1);
    return { body: 'delete success' };
  }
}
