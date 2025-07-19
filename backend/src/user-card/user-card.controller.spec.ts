import { Test, TestingModule } from '@nestjs/testing';
import { UserCardController } from './user-card.controller';
import { UserCardService } from './user-card.service';

describe('UserCardController', () => {
  let controller: UserCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCardController],
      providers: [UserCardService],
    }).compile();

    controller = module.get<UserCardController>(UserCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
