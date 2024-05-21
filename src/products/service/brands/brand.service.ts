import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createDTO, updateDTO } from 'src/products/dto/brand.dto';
import { Brand as brandEntity } from '../../entity/brands.entity'
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  constructor (
    @InjectRepository(brandEntity) private brandRepository: Repository<brandEntity>
  ) {}

  async findAll(options){
    return await this.brandRepository.find()
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne({
      where: {id},
      relations: ['products']
    });
    if (!brand) {
      throw new HttpException('Brand not found', HttpStatus.NOT_FOUND);
    }
    return brand;
  }

  created(payload: createDTO){
    const newBrand = this.brandRepository.create(payload);
    return this.brandRepository.save(newBrand)
  }

  async update(id: number, payload: updateDTO) {
    const product = await this.brandRepository.findOneBy({id});
    this.brandRepository.merge(product, payload);
    return this.brandRepository.save(product);
  }

  delete(id: number) {
    return this.brandRepository.delete(id)
  }
}
