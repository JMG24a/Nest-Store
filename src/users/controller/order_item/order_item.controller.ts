import {
  Body,
  Controller,
  Param,
  Post,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
// my dependencies
import { CreateDTO } from '../../dto/order_item.dto';
import { OrderItemService } from '../../service/order_item/order_item.service';

@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private orderItemService: OrderItemService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateDTO) {
    return this.orderItemService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: CreateDTO) {
    return this.orderItemService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.orderItemService.delete(id);
  }
}
