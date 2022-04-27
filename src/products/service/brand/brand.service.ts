import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Brands } from 'src/products/entity/brand.entity';
import { CreateBrandDTO, UpdateBrandDTO } from 'src/products/DTO/brand.dto';

@Injectable()
export class BrandService {
  constructor(@InjectModel(Brands.name) private brandModel: Model<Brands>) {}

  findAll() {
    return this.brandModel.find().exec();
  }

  getOne(id: string) {
    return this.brandModel.findById(id).exec();
  }

  create(payload: CreateBrandDTO) {
    const newCategory = new this.brandModel(payload);
    return newCategory.save();
  }

  update(id: string, payload: UpdateBrandDTO) {
    return this.brandModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
  }

  delete(id: string) {
    return this.brandModel.findByIdAndDelete(id).exec();
  }
}
