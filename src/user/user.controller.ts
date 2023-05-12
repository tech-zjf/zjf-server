import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findUserByUid(@Param('id') id: string) {
    return await this.userService.findUserByUid(+id);
  }

  @Post()
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.userService.create(userDto);
  }
}
