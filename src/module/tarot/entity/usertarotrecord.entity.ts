import { ITarot, IUserTarotRecord } from '../../../common';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as dayjs from 'dayjs';

@Entity()
export class UserTarotRecord implements IUserTarotRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 20 })
  userId: string;

  @Column({
    type: 'varchar',
    length: 30,
    default: dayjs().format('DD-MM-YYYY HH:mm'),
  })
  drewDate: string;

  @Column({ type: 'smallint' })
  numberOfCards: number;

  @Column({ type: 'jsonb' })
  cards: ITarot[];
}
