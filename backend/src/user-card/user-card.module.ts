import { Module } from '@nestjs/common';
import { UserCardService } from './user-card.service';
import { UserCardController } from './user-card.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCard } from './entities/user-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCard])],
  controllers: [UserCardController],
  providers: [UserCardService],
})
export class UserCardModule { }
