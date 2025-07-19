import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { UserAddress } from './entities/user-address.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('createNewAddress')
  async create(@Request() req: any, @Body() createUserAddressDto: CreateUserAddressDto) {
    const userId = req.user.userId
    return await this.userAddressService.create(userId, createUserAddressDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getalladdress')
  findAll(
    @Request() req: any
  ): Promise<UserAddress> {
    const userId = req.user.userId
    return this.userAddressService.findAllAddress(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAddressService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto) {
    return this.userAddressService.update(+id, updateUserAddressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAddressService.remove(+id);
  }
}
