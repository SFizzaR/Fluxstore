import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UserCardService } from './user-card.service';
import { CreateUserCardDto } from './dto/create-user-card.dto';
import { UpdateUserCardDto } from './dto/update-user-card.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('user-card')
export class UserCardController {
  constructor(private readonly userCardService: UserCardService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('AddNewCard')
  async create(@Request() req: any,
    @Body() createUserCardDto: CreateUserCardDto) {
    const userId = req.user.userId
    return await this.userCardService.create(userId, createUserCardDto);
  }

  @Get()
  findAll() {
    return this.userCardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userCardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserCardDto: UpdateUserCardDto) {
    return this.userCardService.update(+id, updateUserCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userCardService.remove(+id);
  }
}
