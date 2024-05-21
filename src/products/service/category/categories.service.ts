import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category as categoryEntity } from '../../entity/categories.entity'
import { createDTO, updateDTO } from 'src/products/dto/categories.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(categoryEntity) private categoryRepository: Repository<categoryEntity>,
  ){}

  async findAll(options) {
    return await this.categoryRepository.find()
  }

  async findOne(id: number) {
    const product = await this.categoryRepository.findOne({
      where: {id},
      relations: ['product']
    });
    if (!product) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async create(payload: createDTO) {
    const newCategory = this.categoryRepository.create(payload);
    return this.categoryRepository.save(newCategory);
  }

  async update(id: number, payload: updateDTO) {
    const category = await this.findOne(id);
    this.categoryRepository.merge(category, payload);
    return this.categoryRepository.save(category);
  }

  delete(id: number) {
    return this.categoryRepository.delete(id)
  }
}
