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
// my dependencies
import { OptionsFilter } from 'src/utils/filter.dto';
import { ParseInt } from '../../../common/parse-int.pipe';
import { CreateDTO, UpdateDTO } from '../../dto/user.dto';
import { UsersService } from '../../service/users/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List of users' })
  @HttpCode(HttpStatus.OK)
  list(@Query() params: OptionsFilter,) {
    return this.userService.findAll(params);
  }

  @Get(':id')
  async getOne(@Param('id', ParseInt) id: number) {
    const success = await this.userService.findOne(id);
    return success
  }

  // @Get('user/:id')
  // @HttpCode(HttpStatus.OK)
  // getOrder(@Param('id', ParseIntPipe) id: number) {
  //   const success = this.userService.getOrderByUser(id);
  //   return success;
  // }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateDTO) {
    return this.userService.create(body);
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Body() body: UpdateDTO, @Param('id', ParseIntPipe) id: number) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
