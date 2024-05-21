import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
// my dependencies
import { CreateDTO, UpdateDTO } from '../../dto/order_item.dto';
import { Order as OrderEntity } from '../../entity/order.entity';
import { OrderItem as OrderItemEntity } from '../../entity/order-item.entity';
import { Product as ProductEntity } from '../../../products/entity/products.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderEntity) private OrderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
    @InjectRepository(OrderItemEntity) private orderItemRepository: Repository<OrderItemEntity>,
  ){}

  async create(payload: CreateDTO){
    const product = await this.productRepository.findOne({
      where: {id: payload.productId}
    })
    const order = await this.OrderRepository.findOne({
      where: {id: payload.orderId}
    })

    const item = new OrderItemEntity()
    item.order = order;
    item.product = product;
    item.quantity = payload.quantity;
    return this.orderItemRepository.save(item);
  }

  async update(id: number, payload: UpdateDTO){
    const item = await this.orderItemRepository.findOne({
      where: {id}
    })
    this.orderItemRepository.merge(item, payload);
    return this.orderItemRepository.save(item);
  }

  delete(id: number, ){
    return this.orderItemRepository.delete(id)
  }
}
