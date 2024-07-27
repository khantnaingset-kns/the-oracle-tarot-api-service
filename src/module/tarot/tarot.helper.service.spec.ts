import { TarotHelperService } from './tarot.helper.service';
import { TAROT_CARDS } from '../../common';

describe('TarotService', () => {
  let service: TarotHelperService;

  beforeEach(async () => {
    service = new TarotHelperService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('shuffleDeck', () => {
    it('should return null for an empty deck', () => {
      expect(service.shuffleDeck([])).toBeNull();
    });

    it('should return a shuffled deck', () => {
      const shuffledDeck = service.shuffleDeck([...TAROT_CARDS]);
      expect(shuffledDeck).not.toEqual(TAROT_CARDS);
      expect(shuffledDeck).toHaveLength(TAROT_CARDS.length);
    });
  });

  describe('cutDeck', () => {
    it('should return the bottom half of the deck', () => {
      const deck = [...TAROT_CARDS];
      const bottomHalf = service.cutDeck(deck);
      expect(bottomHalf.length).toBeLessThan(deck.length);
    });
  });

  describe('drawCards', () => {
    it('should draw the specified number of cards from the deck', () => {
      const numberOfCards = 5;
      const drawnCards = service.drawCards(numberOfCards);
      expect(drawnCards).toHaveLength(numberOfCards);
    });
  });
});
