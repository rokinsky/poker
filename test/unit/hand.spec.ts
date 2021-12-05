import { Card } from "@/entities/card.entity";
import { FiveCardHand } from "@/entities/five-card-hand.entity";
import { HandType } from "@/entities/hand-type.entity";
import {
  Flush,
  FourOfAKind,
  FullHouse,
  HighCard,
  Straight,
  StraightFlush,
  ThreeOfAKind,
  TwoPairs,
} from "@/entities/hand-types";
import { Hand } from "@/entities/hand.entity";
import { CardRank } from "@/enums/card-rank.enum";
import { CardSuit } from "@/enums/card-suit.enum";
import { CompareResult } from "@/enums/compare-result.enum";

const mockFiveCardHand = (cards: Card[]) => {
  const hand = new Hand(cards);
  return new FiveCardHand(hand.toString(), hand.cards);
};

describe("Hand Types", () => {
  let type: HandType;
  let hand: FiveCardHand;
  describe("Straight Flush", () => {
    beforeEach(() => {
      type = StraightFlush.instance;
    });

    describe("KcTcJcQcAc", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.KING, CardSuit.CLUBS),
          Card.of(CardRank.TEN, CardSuit.CLUBS),
          Card.of(CardRank.JACK, CardSuit.CLUBS),
          Card.of(CardRank.QUEEN, CardSuit.CLUBS),
          Card.of(CardRank.ACE, CardSuit.CLUBS),
        ]);
      });

      test("should be Straight Flush", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(StraightFlush);
      });

      test("should be AcAc highest cards", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.ACE, CardSuit.CLUBS),
          Card.of(CardRank.ACE, CardSuit.CLUBS),
        ]);
      });
    });

    describe("7d8dTdSdNd", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.SIX, CardSuit.DIAMONDS),
          Card.of(CardRank.EIGHT, CardSuit.DIAMONDS),
          Card.of(CardRank.TEN, CardSuit.DIAMONDS),
          Card.of(CardRank.SEVEN, CardSuit.DIAMONDS),
          Card.of(CardRank.NINE, CardSuit.DIAMONDS),
        ]);
      });

      test("should be Straight Flush", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(StraightFlush);
      });

      test("should be TdTd highest cards", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.TEN, CardSuit.DIAMONDS),
          Card.of(CardRank.TEN, CardSuit.DIAMONDS),
        ]);
      });
    });

    describe("2hAh4h3h5h", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.TWO, CardSuit.HEARTS),
          Card.of(CardRank.ACE, CardSuit.HEARTS),
          Card.of(CardRank.FOUR, CardSuit.HEARTS),
          Card.of(CardRank.THREE, CardSuit.HEARTS),
          Card.of(CardRank.FIVE, CardSuit.HEARTS),
        ]);
      });

      test("should be Straight Flush", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(StraightFlush);
      });

      test("should be FhAh highest cards", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.FIVE, CardSuit.HEARTS),
          Card.of(CardRank.ACE, CardSuit.HEARTS),
        ]);
      });
    });
  });

  describe("Four Of A Kind", () => {
    beforeEach(() => {
      type = FourOfAKind.instance;
    });

    describe("JdJsJhJc9d", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.JACK, CardSuit.DIAMONDS),
          Card.of(CardRank.JACK, CardSuit.SPADES),
          Card.of(CardRank.JACK, CardSuit.HEARTS),
          Card.of(CardRank.JACK, CardSuit.CLUBS),
          Card.of(CardRank.NINE, CardSuit.DIAMONDS),
        ]);
      });

      test("should be Four Of A Kind", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(FourOfAKind);
      });

      test("should be Jd highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.JACK, CardSuit.DIAMONDS),
        ]);
      });
    });
  });

  describe("Full House", () => {
    beforeEach(() => {
      type = FullHouse.instance;
    });

    describe("7d7s7hAcAd", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.SEVEN, CardSuit.DIAMONDS),
          Card.of(CardRank.SEVEN, CardSuit.SPADES),
          Card.of(CardRank.SEVEN, CardSuit.HEARTS),
          Card.of(CardRank.ACE, CardSuit.CLUBS),
          Card.of(CardRank.ACE, CardSuit.DIAMONDS),
        ]);
      });

      test("should be Full House", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(FullHouse);
      });

      test("should be 7dAc highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.SEVEN, CardSuit.DIAMONDS),
          Card.of(CardRank.ACE, CardSuit.CLUBS),
        ]);
      });
    });
  });

  describe("Flush", () => {
    beforeEach(() => {
      type = Flush.instance;
    });

    describe("2d5dAdJdNd", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.TWO, CardSuit.DIAMONDS),
          Card.of(CardRank.FIVE, CardSuit.DIAMONDS),
          Card.of(CardRank.ACE, CardSuit.DIAMONDS),
          Card.of(CardRank.JACK, CardSuit.DIAMONDS),
          Card.of(CardRank.NINE, CardSuit.DIAMONDS),
        ]);
      });

      test("should be Flush", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(Flush);
      });

      test("should be Ad highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.ACE, CardSuit.DIAMONDS),
        ]);
      });
    });
  });

  describe("Straight", () => {
    beforeEach(() => {
      type = Straight.instance;
    });

    describe("5s2cAdFd3h", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.FIVE, CardSuit.SPADES),
          Card.of(CardRank.TWO, CardSuit.CLUBS),
          Card.of(CardRank.ACE, CardSuit.DIAMONDS),
          Card.of(CardRank.FOUR, CardSuit.DIAMONDS),
          Card.of(CardRank.THREE, CardSuit.HEARTS),
        ]);
      });

      test("should be Straight", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(Straight);
      });

      test("should be 5s highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.FIVE, CardSuit.SPADES),
        ]);
      });
    });
  });

  describe("Three Of A Kind", () => {
    beforeEach(() => {
      type = ThreeOfAKind.instance;
    });

    describe("7s7c7d4d3h", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.SEVEN, CardSuit.SPADES),
          Card.of(CardRank.SEVEN, CardSuit.CLUBS),
          Card.of(CardRank.SEVEN, CardSuit.DIAMONDS),
          Card.of(CardRank.FOUR, CardSuit.DIAMONDS),
          Card.of(CardRank.THREE, CardSuit.HEARTS),
        ]);
      });

      test("should be Three Of A Kind", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(ThreeOfAKind);
      });

      test("should be 7s highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.SEVEN, CardSuit.SPADES),
        ]);
      });
    });
  });

  describe("Two Pairs", () => {
    beforeEach(() => {
      type = TwoPairs.instance;
    });

    describe("7s7cKsKd3h", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.SEVEN, CardSuit.SPADES),
          Card.of(CardRank.SEVEN, CardSuit.CLUBS),
          Card.of(CardRank.KING, CardSuit.SPADES),
          Card.of(CardRank.KING, CardSuit.DIAMONDS),
          Card.of(CardRank.THREE, CardSuit.HEARTS),
        ]);
      });

      test("should be Two Pairs", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(TwoPairs);
      });

      test("should be Ks7s highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.KING, CardSuit.SPADES),
          Card.of(CardRank.SEVEN, CardSuit.SPADES),
        ]);
      });
    });
  });

  describe("High Card", () => {
    beforeEach(() => {
      type = HighCard.instance;
    });

    describe("Js7c2s5dTh", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.JACK, CardSuit.SPADES),
          Card.of(CardRank.SEVEN, CardSuit.CLUBS),
          Card.of(CardRank.TWO, CardSuit.SPADES),
          Card.of(CardRank.FIVE, CardSuit.DIAMONDS),
          Card.of(CardRank.TEN, CardSuit.HEARTS),
        ]);
      });

      test("should be High Card", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(HighCard);
      });

      test("should be Js highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.JACK, CardSuit.SPADES),
        ]);
      });
    });

    describe("3s7c2s5dTh", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          Card.of(CardRank.THREE, CardSuit.SPADES),
          Card.of(CardRank.SEVEN, CardSuit.CLUBS),
          Card.of(CardRank.TWO, CardSuit.SPADES),
          Card.of(CardRank.FIVE, CardSuit.DIAMONDS),
          Card.of(CardRank.TEN, CardSuit.HEARTS),
        ]);
      });

      test("should be High Card", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(HighCard);
      });

      test("should be Th highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          Card.of(CardRank.TEN, CardSuit.HEARTS),
        ]);
      });
    });
  });
});

describe("Hand Comparison", () => {
  test("QsQcQh8d8h should be greater than 9s9c9hKdKh", () => {
    const winner = mockFiveCardHand([
      Card.of(CardRank.QUEEN, CardSuit.SPADES),
      Card.of(CardRank.QUEEN, CardSuit.CLUBS),
      Card.of(CardRank.QUEEN, CardSuit.HEARTS),
      Card.of(CardRank.EIGHT, CardSuit.DIAMONDS),
      Card.of(CardRank.EIGHT, CardSuit.HEARTS),
    ]);

    const looser = mockFiveCardHand([
      Card.of(CardRank.NINE, CardSuit.SPADES),
      Card.of(CardRank.NINE, CardSuit.CLUBS),
      Card.of(CardRank.NINE, CardSuit.HEARTS),
      Card.of(CardRank.KING, CardSuit.DIAMONDS),
      Card.of(CardRank.KING, CardSuit.HEARTS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("KsKcKh7d7h should be greater than JdJhQsQcQh", () => {
    const winner = mockFiveCardHand([
      Card.of(CardRank.KING, CardSuit.SPADES),
      Card.of(CardRank.KING, CardSuit.CLUBS),
      Card.of(CardRank.KING, CardSuit.HEARTS),
      Card.of(CardRank.SEVEN, CardSuit.DIAMONDS),
      Card.of(CardRank.SEVEN, CardSuit.HEARTS),
    ]);

    const looser = mockFiveCardHand([
      Card.of(CardRank.JACK, CardSuit.DIAMONDS),
      Card.of(CardRank.JACK, CardSuit.HEARTS),
      Card.of(CardRank.QUEEN, CardSuit.SPADES),
      Card.of(CardRank.QUEEN, CardSuit.CLUBS),
      Card.of(CardRank.QUEEN, CardSuit.HEARTS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("KsKcKh7d7h should be greater than 6d6hKsKcKh", () => {
    const winner = mockFiveCardHand([
      Card.of(CardRank.KING, CardSuit.SPADES),
      Card.of(CardRank.KING, CardSuit.CLUBS),
      Card.of(CardRank.KING, CardSuit.HEARTS),
      Card.of(CardRank.SEVEN, CardSuit.DIAMONDS),
      Card.of(CardRank.SEVEN, CardSuit.HEARTS),
    ]);

    const looser = mockFiveCardHand([
      Card.of(CardRank.SIX, CardSuit.DIAMONDS),
      Card.of(CardRank.SIX, CardSuit.HEARTS),
      Card.of(CardRank.KING, CardSuit.SPADES),
      Card.of(CardRank.KING, CardSuit.CLUBS),
      Card.of(CardRank.KING, CardSuit.HEARTS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("6h2s3c4h5d should be greater than 3s4cAd2h5h", () => {
    const winner = mockFiveCardHand([
      Card.of(CardRank.SIX, CardSuit.HEARTS),
      Card.of(CardRank.TWO, CardSuit.SPADES),
      Card.of(CardRank.THREE, CardSuit.CLUBS),
      Card.of(CardRank.FOUR, CardSuit.HEARTS),
      Card.of(CardRank.FIVE, CardSuit.DIAMONDS),
    ]);

    const looser = mockFiveCardHand([
      Card.of(CardRank.THREE, CardSuit.SPADES),
      Card.of(CardRank.FOUR, CardSuit.CLUBS),
      Card.of(CardRank.ACE, CardSuit.DIAMONDS),
      Card.of(CardRank.TWO, CardSuit.HEARTS),
      Card.of(CardRank.FIVE, CardSuit.HEARTS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("6h2h3h4h5h should be greater than 3s4sAs2s5s", () => {
    const winner = mockFiveCardHand([
      Card.of(CardRank.SIX, CardSuit.HEARTS),
      Card.of(CardRank.TWO, CardSuit.HEARTS),
      Card.of(CardRank.THREE, CardSuit.HEARTS),
      Card.of(CardRank.FOUR, CardSuit.HEARTS),
      Card.of(CardRank.FIVE, CardSuit.HEARTS),
    ]);

    const looser = mockFiveCardHand([
      Card.of(CardRank.THREE, CardSuit.SPADES),
      Card.of(CardRank.FOUR, CardSuit.SPADES),
      Card.of(CardRank.ACE, CardSuit.SPADES),
      Card.of(CardRank.TWO, CardSuit.SPADES),
      Card.of(CardRank.FIVE, CardSuit.SPADES),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("ThJsQcKhAd should be greater than 9cTcJdQhKs", () => {
    const winner = mockFiveCardHand([
      Card.of(CardRank.TEN, CardSuit.HEARTS),
      Card.of(CardRank.JACK, CardSuit.SPADES),
      Card.of(CardRank.QUEEN, CardSuit.CLUBS),
      Card.of(CardRank.KING, CardSuit.HEARTS),
      Card.of(CardRank.ACE, CardSuit.DIAMONDS),
    ]);

    const looser = mockFiveCardHand([
      Card.of(CardRank.NINE, CardSuit.CLUBS),
      Card.of(CardRank.TEN, CardSuit.CLUBS),
      Card.of(CardRank.JACK, CardSuit.DIAMONDS),
      Card.of(CardRank.QUEEN, CardSuit.HEARTS),
      Card.of(CardRank.KING, CardSuit.SPADES),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("ThTsJcJh2d should be less than JdJs3sTdTc", () => {
    const winner = mockFiveCardHand([
      Card.of(CardRank.TEN, CardSuit.HEARTS),
      Card.of(CardRank.TEN, CardSuit.SPADES),
      Card.of(CardRank.JACK, CardSuit.CLUBS),
      Card.of(CardRank.JACK, CardSuit.HEARTS),
      Card.of(CardRank.TWO, CardSuit.DIAMONDS),
    ]);

    const looser = mockFiveCardHand([
      Card.of(CardRank.JACK, CardSuit.DIAMONDS),
      Card.of(CardRank.JACK, CardSuit.SPADES),
      Card.of(CardRank.THREE, CardSuit.SPADES),
      Card.of(CardRank.TEN, CardSuit.DIAMONDS),
      Card.of(CardRank.TEN, CardSuit.CLUBS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.LESS);
  });

  test("ThTsJcJhAd should be equal JdJsAsTdTc", () => {
    const winner = mockFiveCardHand([
      Card.of(CardRank.TEN, CardSuit.HEARTS),
      Card.of(CardRank.TEN, CardSuit.SPADES),
      Card.of(CardRank.JACK, CardSuit.CLUBS),
      Card.of(CardRank.JACK, CardSuit.HEARTS),
      Card.of(CardRank.ACE, CardSuit.DIAMONDS),
    ]);

    const looser = mockFiveCardHand([
      Card.of(CardRank.JACK, CardSuit.DIAMONDS),
      Card.of(CardRank.JACK, CardSuit.SPADES),
      Card.of(CardRank.ACE, CardSuit.SPADES),
      Card.of(CardRank.TEN, CardSuit.DIAMONDS),
      Card.of(CardRank.TEN, CardSuit.CLUBS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.EQUAL);
  });
});
