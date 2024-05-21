import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order as OrderEntity } from '../../entity/order.entity';
import { Customer as CustomerEntity } from '../../entity/customer.entity';
import { CreateDTO, UpdateDTO } from '../../dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity) private orderRepository: Repository<OrderEntity>,
    @InjectRepository(CustomerEntity) private CustomerEntityRepository: Repository<CustomerEntity>
  ){}

  findAll(){
    const ordersItems = this.orderRepository.find()
    return ordersItems
  }

  async findOne(id: number){
    const order = await this.orderRepository.findOne({
      where: {id},
      relations: ['customer', 'items', 'items.product']
    })
    if(!order){
      throw new NotFoundException('not found')
    }
    return order
  }

  async create(payload: CreateDTO){
    const order = new OrderEntity();
    if(!order.customer){
      const customer = await this.CustomerEntityRepository.findOne({
        where: {id: payload.customerId}
      })
      order.customer = customer;
    }
    return this.orderRepository.save(order)
  }

  async update(id: number, payload: UpdateDTO){
    const order = await this.orderRepository.findOne({
      where: {id}
    });

    if(payload.customerId){
      const customer = await this.CustomerEntityRepository.findOne({
        where: {id: payload.customerId}
      })
      order.customer = customer
    }
    return this.orderRepository.save(order)
  }

  delete(id: number){
    return this.orderRepository.delete(id)
  }
}
