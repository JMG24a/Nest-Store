import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';

import { Product as productEntity } from '../../entity/products.entity';
import { Category as categoryEntity } from '../../entity/categories.entity';
import { Brand as brandsEntity } from '../../entity/brands.entity';
import { createDTO, updateDTO } from '../../dto/products.dto';
import { OptionsFilter } from 'src/utils/filter.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(productEntity) private productRepository: Repository<productEntity>,
    @InjectRepository(categoryEntity) private categoryRepository: Repository<categoryEntity>,
    @InjectRepository(brandsEntity) private brandRepository: Repository<brandsEntity>,
  ){}

  async findAll(options: OptionsFilter) {
    const { maxPrice, minPrice } = options
    const { limit, offset } = options
    const where: FindOptionsWhere<productEntity> = {};

    if(maxPrice && minPrice){
      where.price = Between(minPrice, maxPrice)
    }
    return await this.productRepository.find({
      where,
      take: limit,
      skip: offset
    })
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({
      where: {id},
      relations: ['brand', 'category']
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async create(payload: createDTO) {
    const newProduct = this.productRepository.create(payload);
    if (payload.brandId) {
      const brand = await this.brandRepository.findOne({where: {id: payload.brandId}});
      newProduct.brand = brand;
    }
    if (payload.categoriesId) {
      const category = await this.categoryRepository.findBy({ id: In((payload.categoriesId)) });
      newProduct.category = category;
    }
    return this.productRepository.save(newProduct);
  }

  async update(id: number, payload: updateDTO) {
    const product = await this.productRepository.findOneBy({id});
    // challenge many to one
    if (payload.brandId) {
      const brand = await this.brandRepository.findOne({where: {id: payload.brandId}});
      product.brand = brand;
    }
    // challenge many to many
    if (payload.brandId) {
      const category = await this.categoryRepository.findBy({id: In(payload.categoriesId)});
      product.category = category;
    }
    this.productRepository.merge(product, payload);
    return this.productRepository.save(product);
  }

  delete(id: number) {
    return this.productRepository.delete(id)
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      where: {id: productId},
      relations: ['category'],
    });
    const category = await this.categoryRepository.findOne({where: {id: categoryId}});
    product.category.push(category);
    return this.productRepository.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepository.findOne({
      where: {id: productId},
      relations: ['category'],
    });
    product.category = product.category.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepository.save(product);
  }
}
