import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from '@nestjs/passport';
import { use } from 'passport';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post('AddOrder')
  create(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    const userId = req.user.userId
    console.log('req.user:', req.user);
    return this.orderService.create(userId, createOrderDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('getallorders')
  findAll(
    @Request() req: any
  ): Promise<any> {
    console.log('req.user:', req.user); // 🚩 Add this
    const userId = req.user.userId;
    console.log('User Id:', userId)
    return this.orderService.findallOrders(userId);
  }



  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
