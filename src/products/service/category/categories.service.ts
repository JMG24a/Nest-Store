import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from 'src/products/DTO/categories.dto';
import { Categories } from 'src/products/entity/categories';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name) private categoryModel: Model<Categories>,
  ) {}

  findAll() {
    return this.categoryModel.find().exec();
  }

  getOne(id: string) {
    return this.categoryModel.findById(id).exec();
  }

  create(payload: CreateCategoryDTO) {
    const newCategory = new this.categoryModel(payload);
    return newCategory.save();
  }

  update(id: string, payload: UpdateCategoryDTO) {
    return this.categoryModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
  }

  delete(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
