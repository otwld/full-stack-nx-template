import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './service';
import { UsersContract, UsersPatterns } from './contract';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('user_create')
  create(
    @Payload() payload: UsersContract['Create']['Request'],
  ): Promise<UsersContract['Create']['Response']> {
    console.info('create_user:', payload);
    return this.usersService.create(payload);
  }

  @MessagePattern(UsersPatterns.GetAll)
  getUsers(@Payload() payload: UsersContract['GetAll']['Request']) {
    return this.usersService.findAll(payload);
  }

  @MessagePattern(UsersPatterns.GetById)
  getById(
    @Payload() payload: UsersContract['GetById']['Request'],
  ): Promise<UsersContract['GetById']['Response']> {
    console.info('get_user_by_id:', payload);
    return this.usersService.findOne(payload.id);
  }
}
