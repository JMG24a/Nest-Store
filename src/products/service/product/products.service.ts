import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model, FilterQuery } from 'mongoose';
import { Products } from 'src/products/entity/products.entity';
import {
  CreateProductDTO,
  FilterProductDTO,
  UpdateProductDTO,
} from '../../DTO/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productModel: Model<Products>,
  ) {}

  findAll(params?: FilterProductDTO) {
    if (params) {
      const filters: FilterQuery<Products> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }
      return this.productModel.find(filters).skip(offset).limit(limit).exec();
    }
    return this.productModel.find().exec();
  }

  async findOne(id: string) {
    try {
      const user = await this.productModel
        .findById(id)
        .populate('brand')
        .exec();
      if (!user) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (e) {
      console.error(e);
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  create(payload: CreateProductDTO) {
    try {
      const product = new this.productModel(payload);
      return product.save();
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'DB not response',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateProductDTO) {
    try {
      const changeProduct = await this.productModel
        .findByIdAndUpdate(id, { $set: payload }, { new: true })
        .exec();
      if (!changeProduct) {
        throw new Error();
      }
      return changeProduct;
    } catch (e) {
      console.error(e);
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string) {
    try {
      const productDelete = await this.productModel
        .findByIdAndDelete(id)
        .exec();
      return { delete: productDelete._id };
    } catch (e) {
      console.error(e);
      throw new HttpException(
        'DB not response',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

//
//
//
//
// ** trabajando con db en memoria
// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { Product } from 'src/products/entity/products.entity';
// import { createDTO, updateDTO } from '../../DTO/products.dto';

// @Injectable()
// export class ProductsService {
//   private counterId = 1;
//   private products: Product[] = [
//     {
//       id: 1,
//       name: 'Product 1',
//       description: 'bla bla',
//       price: 122,
//       image: '',
//       stock: 12,
//     },
//   ];

//   findAll(options) {
//     if (options.limit || options.offset) {
//       return { body: this.products };
//     }
//     return this.products;
//   }

//   findOne(id: number) {
//     const index = this.products.findIndex((item) => item.id == id);
//     if (index === -1) {
//       throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
//     }
//     const user = this.products[index];
//     return { index, user };
//   }

//   create(payload: createDTO) {
//     this.counterId = this.counterId + 1;
//     const newProduct = {
//       id: this.counterId,
//       ...payload,
//     };
//     this.products.push(newProduct);
//     return newProduct;
//   }

//   update(id: number, payload: updateDTO) {
//     const { index } = this.findOne(id);
//     let update = this.products[index];
//     update = { ...update, ...payload };
//     this.products[index] = update;
//     return this.products[index];
//   }

//   delete(id: number) {
//     const user = this.findOne(id);
//     this.products.splice(user.index, 1);
//     return { body: 'delete success' };
//   }
// }
