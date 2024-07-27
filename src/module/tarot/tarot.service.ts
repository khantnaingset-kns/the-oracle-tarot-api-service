import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTarotRecord } from './entity';
import { Repository } from 'typeorm';
import { IUserTarotRecord } from 'src/common';

@Injectable()
export class TarotService {
  constructor(
    @InjectRepository(UserTarotRecord)
    private readonly repository: Repository<UserTarotRecord>,
  ) {}

  create(data: Partial<IUserTarotRecord>): Promise<UserTarotRecord> {
    const userTarotRecord: UserTarotRecord = new UserTarotRecord();

    userTarotRecord.userId = data.userId;
    userTarotRecord.numberOfCards = data.numberOfCards;
    userTarotRecord.cards = data.cards;

    return this.repository.save(userTarotRecord);
  }

  findByUserId(userId: string): Promise<UserTarotRecord[]> {
    return this.repository.find({ where: { userId } });
  }
}
