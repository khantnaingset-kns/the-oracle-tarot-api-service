import { Injectable } from '@nestjs/common';
import { ITarot, TAROT_CARDS } from '../../common';

@Injectable()
export class TarotHelperService {
  shuffleDeck(deck: ITarot[]): ITarot[] | null {
    if (deck.length === 0 || !deck) {
      return null;
    }

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  cutDeck(deck: ITarot[]): ITarot[] {
    const cutIndex = Math.floor(Math.random() * deck.length);
    return deck.slice(cutIndex);
  }

  drawCards(cards: number): ITarot[] {
    const deck = this.shuffleDeck([...TAROT_CARDS]);
    const bottomHalfOfDeck = this.cutDeck(deck);
    return bottomHalfOfDeck.slice(0, cards);
  }
}
