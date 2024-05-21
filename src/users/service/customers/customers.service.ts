import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDTO, UpdateDTO } from '../../dto/customer.dto';
import { Customer as customerEntity } from '../../entity/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(customerEntity) private customerRepository: Repository<customerEntity>,
  ){}

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: {id},
      relations: ['user']
    });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  create(payload: CreateDTO) {
    const newCustomer = this.customerRepository.create(payload);
    return this.customerRepository.save(newCustomer);
  }

  async update(id: number, changes: UpdateDTO) {
    const customer = await this.findOne(id);
    this.customerRepository.merge(customer, changes);
    return this.customerRepository.save(customer);
  }

  remove(id: number) {
    return this.customerRepository.delete(id);
  }
}

