import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserAddressService {
  constructor(
    @InjectRepository(UserAddress)
    private userAddressRepository: Repository<UserAddress>,
    private datasource: DataSource) { }

  async create(userId: number, createUserAddressDto: CreateUserAddressDto) {
    var res = {
      message: '',
      statuscode: 200,
      Id: 0
    }
    try {
      const newUserAddress = this.userAddressRepository.create({ UserId: userId, ...createUserAddressDto })
      const savedAddress = await this.userAddressRepository.save(newUserAddress);
      res.message = 'User Address created'
      res.Id = savedAddress.Id
      res.statuscode = 201

    } catch (error) {
      res.statuscode = 400
      res.message = "Internal Server Error"
    }
    return res
  }

  findAllAddress(UserId: number) {
    if (!UserId) {
      throw new BadGatewayException("User Id is required")
    }
    else {
      let query = `select * from user_address where UserId = ${UserId}`
      return this.datasource.query(query)
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} userAddress`;
  }

  update(id: number, updateUserAddressDto: UpdateUserAddressDto) {
    return `This action updates a #${id} userAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAddress`;
  }
}
