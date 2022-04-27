import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
//Module
import { ProductsModule } from '../products/products.module';
//controllers
import { UserController } from './controller/user/users.controller';
import { CustomerController } from './controller/customer/customer.controller';
import { OrderController } from './controller/order/order.controller';
//services
import { UserService } from './service/users/users.service';
import { CustomerService } from './service/customer/customer.service';
import { OrderService } from './service/order/order.service';
//schemas
import { UserSchema, Users } from './entity/user.entity';
import { Customers, CustomerSchema } from './entity/customer.entity';

@Module({
  controllers: [UserController, CustomerController, OrderController],
  providers: [UserService, CustomerService, OrderService],
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: Customers.name,
        schema: CustomerSchema,
      },
    ]),
  ],
})
export class UsersModule {}

// imports: [
//   forwardRef(() => ProductsModule), // fordwardRef nos ayuda a que ambos servicios sean llamados recíprocamente
// ],
