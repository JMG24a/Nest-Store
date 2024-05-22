import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// my dependencies
import { ProductsModule } from '../products/products.module';
import { UsersController } from './controller/user/users.controller';
import { UsersService } from './service/users/users.service';
import { Users as UsersEntity } from './entity/user.entity'

import { CustomersController } from './controller/customer/customers.controller';
import { CustomersService } from './service/customers/customers.service';
import { Customer as CustomersEntity } from './entity/customer.entity'

import { OrdersController } from './controller/order/orders.controller';
import { OrderService } from './service/order/order.service';
import { Order as OrdersEntity } from './entity/order.entity'

import { OrderItemController } from './controller/order_item/order_item.controller';
import { OrderItemService } from './service/order_item/order_item.service';
import { OrderItem as OrderItemsEntity } from './entity/order-item.entity'

const typeOrmModule = TypeOrmModule.forFeature([
  UsersEntity,
  CustomersEntity,
  OrdersEntity,
  OrderItemsEntity
])

@Module({
  imports: [ProductsModule, typeOrmModule],
  controllers: [UsersController, CustomersController, OrdersController, OrderItemController],
  providers: [UsersService, CustomersService, OrderService, OrderItemService],
  exports: [UsersService]
})
export class UsersModule {}

// imports: [
//   forwardRef(() => ProductsModule), // fordwardRef nos ayuda a que ambos servicios sean llamados recíprocamente
// ],
