import { Repository, Between, FindOptionsWhere } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// my dependencies
import { OptionsFilter } from 'src/utils/filter.dto';
import { CreateDTO, UpdateDTO } from '../../dto/user.dto';
import { Users as usersEntity } from '../../entity/user.entity';
import { CustomersService } from '../customers/customers.service';
// import { ProductsService } from '../../../products/service/product/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(usersEntity) private usersRepository: Repository<usersEntity>,
    // private productsService: ProductsService,
    private customersService: CustomersService,
  ) {}

  async findAll(options?: OptionsFilter) {
    if(options){
      const where: FindOptionsWhere<usersEntity> = {};
      const { limit, offset, role } = options;

      if(role){
        where.role = role
      }

      return await this.usersRepository.find({
        where,
        take: limit,
        skip: offset
      });
    }
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const product = await this.usersRepository.findOne({
      where: {id},
      relations: ['customer']
    });
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async create(payload: CreateDTO) {
    const newUser = this.usersRepository.create(payload);
    if (payload.customerId) {
      const customer = await this.customersService.findOne(payload.customerId);
      newUser.customer = customer;
    }
    return this.usersRepository.save(newUser);
  }

  async update(id: number, payload: UpdateDTO) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, payload);
    return this.usersRepository.save(user);
  }

  delete(id: number) {
    return this.usersRepository.delete(id)
  }

  // async getOrderByUser(id: number) {
  //   const user = await this.findOne(id);
  //   const products = await this.productsService.find();
  //   return {
  //     order: new Date(),
  //     user,
  //     products,
  //   };
  // }
}
