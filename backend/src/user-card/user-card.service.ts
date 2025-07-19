import { Injectable } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user-card.dto';
import { UpdateUserCardDto } from './dto/update-user-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCard } from './entities/user-card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserCardService {
  constructor(
    @InjectRepository(UserCard)
    private userCardRepository: Repository<UserCard>
  ) { }
  async create(UserId: number, createUserCardDto: CreateUserCardDto) {
    var res = {
      message: '',
      statuscode: 200,
      Id: 0
    }
    try {
      const newUserCard = this.userCardRepository.create({ UserId, ...createUserCardDto })
      const savedCard = await this.userCardRepository.save(newUserCard)
      res.message = "New User Card created"
      res.statuscode = 201
      res.Id = savedCard.Id
    } catch (error) {
      console.log(error)
      res.message = "Internal server error"
      res.statuscode = 400
    }
    return res
  }

  findAll() {
    return `This action returns all userCard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userCard`;
  }

  update(id: number, updateUserCardDto: UpdateUserCardDto) {
    return `This action updates a #${id} userCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCard`;
  }
}
