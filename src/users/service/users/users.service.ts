import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/service/product/products.service';
import { Users } from 'src/users/entity/user.entity';
import { createUserDTO, updateUserDTO } from '../../DTO/user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<Users>,
    private productsService: ProductsService,
  ) {}

  async findAll() {
    const collection = this.userModel.find().exec();
    return collection;
  }

  async findOne(id: string) {
    try {
      const success = await this.userModel.findById(id).exec();
      if (!success) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return success;
    } catch (e) {
      console.error(e);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  create(payload: createUserDTO) {
    const newUser = new this.userModel(payload);
    return newUser.save();
  }

  async update(id: string, payload: updateUserDTO) {
    try {
      const change = await this.userModel
        .findByIdAndUpdate(id, { $set: payload }, { new: true })
        .exec();
      if (!change) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return change;
    } catch (e) {
      console.error(e);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async delete(id: string) {
    try {
      const userDelete = await this.userModel.findByIdAndDelete(id);
      return { delete: userDelete._id };
    } catch (e) {
      console.error(e);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  getOrderByUser(id: string) {
    const user = this.findOne(id);
    const products = this.productsService.findAll();
    return {
      order: new Date(),
      user,
      products,
    };
  }
}

// ** injeccion de mongo db de sin schema
//   constructor(
//   @Inject('mongoDB') private db: Db,
//   uso de product service que fue importado en user-modul
//   private productsService: ProductsService,
// ) {}

// ** uso de la db sin schema
//   async findAll(options) {
//   if (options.limit || options.offset) {
//     return { body: this.users };
//   }
//   const collection = this.db.collection('users');
//   const success = await collection.find().toArray();
//   return success;
// }
