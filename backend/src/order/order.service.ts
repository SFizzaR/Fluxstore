import { BadRequestException, Injectable, UseGuards } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders)
    private orderRepository: Repository<Orders>,
    private dataSource: DataSource
  ) { }

  async create(userId: number, createOrderDto: CreateOrderDto) {
    var res = {
      message: '',
      statuscode: 200,
      Id: 0
    }
    if (!createOrderDto.Total) {
      res.message = 'Total cannot be null'
    }
    else {
      try {
        const Status = 1
        const newOrder = this.orderRepository.create({ UserId: userId, ...createOrderDto, Status })
        const savedOrder = await this.orderRepository.save(newOrder);
        res.Id = savedOrder.Id
        res.message = 'Order created';
        res.statuscode = 201
      }
      catch (err) {
        res.statuscode = 400
        res.message = "Internal Server Error"

      }
    }
    return res
  }

  async findallOrders(UserId: number): Promise<any[]> {
    if (!UserId) {
      throw new BadRequestException('UserId is required.');
    }
    let query = `call FetchAllOrders (${UserId});`
    return this.dataSource.query(query);


  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
