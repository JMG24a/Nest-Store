import { Module } from '@nestjs/common';
//controllers
import { CustomersController } from './controller/customer/customers.controller';
import { OrdersController } from './controller/order/orders.controller';
import { UsersController } from './controller/user/users.controller';
import { UserService } from './service/users/users.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController, OrdersController, UsersController],
  providers: [UserService],
  exports: []
})
export class UsersModule {}

// imports: [
//   forwardRef(() => ProductsModule), // fordwardRef nos ayuda a que ambos servicios sean llamados recíprocamente
// ],
