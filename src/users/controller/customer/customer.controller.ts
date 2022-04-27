import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCustomerDTO } from 'src/users/DTO/customer.dto';

import { CustomerService } from 'src/users/service/customer/customer.service';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async list() {
    const success = await this.customerService.findAll();
    return { body: success };
  }

  @Post()
  async create(@Body() payload: CreateCustomerDTO) {
    const success = await this.customerService.create(payload);
    return { body: success };
  }
}
