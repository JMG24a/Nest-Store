import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCategoryDTO } from 'src/products/DTO/categories.dto';
import { CreateCustomerDTO } from 'src/users/DTO/customer.dto';
import { Customers } from 'src/users/entity/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customers.name) private customerModel: Model<Customers>,
  ) {}

  findAll() {
    return this.customerModel.find().exec();
  }

  getOne(id: string) {
    return this.customerModel.findById(id).exec();
  }

  create(payload: CreateCustomerDTO) {
    const newCategory = new this.customerModel(payload);
    return newCategory.save();
  }

  update(id: string, payload: UpdateCategoryDTO) {
    return this.customerModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
  }

  delete(id: string) {
    return this.customerModel.findByIdAndDelete(id).exec();
  }
}
