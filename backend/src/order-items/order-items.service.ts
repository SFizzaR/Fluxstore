import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    private datasource: DataSource
  ) { }
  create(createOrderItemDto: CreateOrderItemDto) {
    var res = {
      message: '',
      statuscode: 200

    }
    if (createOrderItemDto.Quantity === 0) {
      res.message = 'Quantity cannot be 0'
    }
    else {
      try {
        const newOrderItem = this.orderItemsRepository.create(
          createOrderItemDto,
        )
        this.orderItemsRepository.save(newOrderItem)
        res.message = 'Order Item created'
        res.statuscode = 201
      } catch (err) {
        res.message = err.toString()
        res.statuscode = 400
      }
    }
    return res
  }

  findAll(OrderId: number) {
    if (!OrderId) {
      throw new BadGatewayException("Order Id is required")
    }
    else {
      const params: any[] = []
      const query = `select * from order_item where OrderId = ?`
      params.push(OrderId)
      return this.datasource.query(query, params)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} orderItem`;
  }

  update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    return `This action updates a #${id} orderItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderItem`;
  }
}
