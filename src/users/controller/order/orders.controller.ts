import { ParseInt } from '../../../common/parse-int.pipe';
import { CreateDTO, UpdateDTO } from '../../dto/order.dto';
import { OrderService } from '../../service/order/order.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrderService) {}

  @Get()
  @ApiOperation({ summary: 'List of users' })
  @HttpCode(HttpStatus.OK)
  list(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.orderService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseInt) id: number) {
    const success = await this.orderService.findOne(id);
    return success
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateDTO) {
    return this.orderService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Body() body: UpdateDTO, @Param('id', ParseIntPipe) id: number) {
    return this.orderService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.delete(id);
  }
}
