import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/service/product/products.service';
import { UsersEntity } from 'src/users/entity/user.entity';
import { createDTO, updateDTO } from '../../DTO/user.dto';
import { Db } from 'mongodb';

@Injectable()
export class UserService {
  constructor(
    @Inject('mongoDB') private db: Db,
    private productsService: ProductsService,
  ) {}

  counterId = 0;
  users: UsersEntity[] = [
    {
      id: 0,
      name: 'jose',
      email: 'mail@mail.com',
      phon: '+584145035188',
      address: 'called 3 between 1 y 2',
    },
  ];

  async findAll(options) {
    if (options.limit || options.offset) {
      return { body: this.users };
    }
    const collection = this.db.collection('users');
    const success = await collection.find().toArray();
    return success;
  }

  findOne(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const user = this.users[index];
    return { index, user };
  }

  create(payload: createDTO) {
    this.counterId = this.counterId + 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.users.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: updateDTO) {
    const { index } = this.findOne(id);
    let update = this.users[index];
    update = { ...update, ...payload };
    this.users[index] = update;
    return this.users[index];
  }

  delete(id: number) {
    const user = this.findOne(id);
    this.users.splice(user.index, 1);
    return { body: 'delete success' };
  }

  getOrderByUser(id: number) {
    const { user } = this.findOne(id);
    const products = this.productsService.findAll({});
    return {
      order: new Date(),
      user,
      products,
    };
  }
}
