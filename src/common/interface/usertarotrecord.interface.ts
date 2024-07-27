import { ITarot } from './tarot.interface';

export interface IUserTarotRecord {
  id?: string;
  userId: string;
  drewDate?: string;
  numberOfCards: number;
  cards: ITarot[];
}
