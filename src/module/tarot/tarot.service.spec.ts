import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TarotService } from './tarot.service';
import { UserTarotRecord } from './entity';
import { IUserTarotRecord } from '../../common';
import { v4 as uuidv4 } from 'uuid';
import * as dayjs from 'dayjs';

describe('TarotService', () => {
  let service: TarotService;
  let repository: Repository<UserTarotRecord>;

  const userId = uuidv4();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TarotService,
        {
          provide: getRepositoryToken(UserTarotRecord),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<TarotService>(TarotService);
    repository = module.get<Repository<UserTarotRecord>>(
      getRepositoryToken(UserTarotRecord),
    );
  });

  describe('create', () => {
    it('should create a new UserTarotRecord', async () => {
      const data: IUserTarotRecord = {
        userId,
        numberOfCards: 2,
        cards: [
          { name: 'The Fool', number: 0 },
          { name: 'The Magician', number: 1 },
        ],
      };

      const userTarotRecord = new UserTarotRecord();
      userTarotRecord.userId = data.userId;
      userTarotRecord.numberOfCards = data.numberOfCards;
      userTarotRecord.cards = data.cards;

      jest.spyOn(repository, 'save').mockResolvedValue(userTarotRecord);

      expect(await service.create(data)).toEqual(userTarotRecord);
      expect(repository.save).toHaveBeenCalledWith(userTarotRecord);
    });
  });

  describe('findByUserId', () => {
    it('should return an array of UserTarotRecord', async () => {
      const userTarotRecords: UserTarotRecord[] = [
        {
          id: uuidv4(),
          userId,
          numberOfCards: 3,
          drewDate: dayjs().format('DD-MM-YYYY HH:mm'),
          cards: [
            { name: 'The Fool', number: 0 },
            { name: 'The Magician', number: 1 },
          ],
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(userTarotRecords);

      expect(await service.findByUserId(userId)).toEqual(userTarotRecords);
      expect(repository.find).toHaveBeenCalled();
    });
  });
});
