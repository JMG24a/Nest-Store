import { createUserDTO, updateUserDTO } from '../../DTO/user.dto';
import { UserService } from '../../service/users/users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'List of users' })
  @HttpCode(HttpStatus.OK)
  async list() {
    const success = await this.userService.findAll();
    return { body: success };
  }

  @Get('user/:id')
  @HttpCode(HttpStatus.OK)
  async getOrder(@Param('id') id: string) {
    const success = await this.userService.getOrderByUser(id);
    return { body: success };
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const success = await this.userService.findOne(id);
    return { body: success };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: createUserDTO) {
    const success = await this.userService.create(body);
    return { body: success };
  }

  @Put(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  async update(@Body() body: updateUserDTO, @Param('id') id: string) {
    const success = await this.userService.update(id, body);
    return { body: success };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: string) {
    const success = await this.userService.delete(id);
    return { body: success };
  }
}

// ** controller para controladores en memoria
// import { ParseInt } from '../../../common/parse-int.pipe';
// import { createDTO, updateDTO } from '../../DTO/user.dto';
// import { UserService } from '../../service/users/users.service';
// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Post,
//   Query,
//   ParseIntPipe,
//   HttpCode,
//   HttpStatus,
//   Delete,
//   Put,
// } from '@nestjs/common';
// import { ApiOperation, ApiTags } from '@nestjs/swagger';

// @ApiTags('users')
// @Controller('users')
// export class UsersController {
//   constructor(private userService: UserService) {}

//   @Get()
//   @ApiOperation({ summary: 'List of users' })
//   @HttpCode(HttpStatus.OK)
//   list(@Query('limit') limit: number, @Query('offset') offset: number) {
//     return this.userService.findAll({ limit, offset });
//   }

//   @Get('user/:id')
//   @HttpCode(HttpStatus.OK)
//   getOrder(@Param('id') id: string) {
//     const success = this.userService.getOrderByUser(id);
//     return { body: success };
//   }

//   @Get(':id')
//   getOne(@Param('id', ParseInt) id: number) {
//     const success = this.userService.findOne(id);
//     return {
//       body: success.user,
//     };
//   }

//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   create(@Body() body: createDTO) {
//     return this.userService.create(body);
//   }

//   @Put(':id')
//   @HttpCode(HttpStatus.ACCEPTED)
//   update(@Body() body: updateDTO, @Param('id', ParseIntPipe) id: number) {
//     return this.userService.update(id, body);
//   }

//   @Delete(':id')
//   @HttpCode(HttpStatus.OK)
//   delete(@Param('id', ParseIntPipe) id: number) {
//     return this.userService.delete(id);
//   }
// }
