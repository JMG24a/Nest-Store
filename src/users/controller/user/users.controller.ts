import { ParseInt } from '../../../common/parse-int.pipe';
import { createDTO, updateDTO } from '../../DTO/user.dto';
import { UserService } from '../../service/users/users.service';
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

@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  list(@Query('limit') limit: number, @Query('offset') offset: number) {
    return this.userService.findAll({ limit, offset });
  }

  @Get('user/:id')
  @HttpCode(HttpStatus.OK)
  getOrder(@Param('id', ParseIntPipe) id: number) {
    const success = this.userService.getOrderByUser(id);
    return { body: success };
  }

  @Get(':id')
  getOne(@Param('id', ParseInt) id: number) {
    const success = this.userService.findOne(id);
    return {
      body: success.user,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: createDTO) {
    return this.userService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Body() body: updateDTO, @Param('id', ParseIntPipe) id: number) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
