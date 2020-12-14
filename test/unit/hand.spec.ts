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
      type = new StraightFlush();
    });

    describe("KcTcJcQcAc", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.KING, CardSuit.CLUBS),
          new Card(CardRank.TEN, CardSuit.CLUBS),
          new Card(CardRank.JACK, CardSuit.CLUBS),
          new Card(CardRank.QUEEN, CardSuit.CLUBS),
          new Card(CardRank.ACE, CardSuit.CLUBS),
        ]);
      });

      test("should be Straight Flush", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(StraightFlush);
      });

      test("should be AcAc highest cards", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.ACE, CardSuit.CLUBS),
          new Card(CardRank.ACE, CardSuit.CLUBS),
        ]);
      });
    });

    describe("7d8dTdSdNd", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.SIX, CardSuit.DIAMONDS),
          new Card(CardRank.EIGHT, CardSuit.DIAMONDS),
          new Card(CardRank.TEN, CardSuit.DIAMONDS),
          new Card(CardRank.SEVEN, CardSuit.DIAMONDS),
          new Card(CardRank.NINE, CardSuit.DIAMONDS),
        ]);
      });

      test("should be Straight Flush", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(StraightFlush);
      });

      test("should be TdTd highest cards", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.TEN, CardSuit.DIAMONDS),
          new Card(CardRank.TEN, CardSuit.DIAMONDS),
        ]);
      });
    });

    describe("2hAh4h3h5h", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.TWO, CardSuit.HEARTS),
          new Card(CardRank.ACE, CardSuit.HEARTS),
          new Card(CardRank.FOUR, CardSuit.HEARTS),
          new Card(CardRank.THREE, CardSuit.HEARTS),
          new Card(CardRank.FIVE, CardSuit.HEARTS),
        ]);
      });

      test("should be Straight Flush", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(StraightFlush);
      });

      test("should be FhAh highest cards", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.FIVE, CardSuit.HEARTS),
          new Card(CardRank.ACE, CardSuit.HEARTS),
        ]);
      });
    });
  });

  describe("Four Of A Kind", () => {
    beforeEach(() => {
      type = new FourOfAKind();
    });

    describe("JdJsJhJc9d", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.JACK, CardSuit.DIAMONDS),
          new Card(CardRank.JACK, CardSuit.SPADES),
          new Card(CardRank.JACK, CardSuit.HEARTS),
          new Card(CardRank.JACK, CardSuit.CLUBS),
          new Card(CardRank.NINE, CardSuit.DIAMONDS),
        ]);
      });

      test("should be Four Of A Kind", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(FourOfAKind);
      });

      test("should be Jd highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.JACK, CardSuit.DIAMONDS),
        ]);
      });
    });
  });

  describe("Full House", () => {
    beforeEach(() => {
      type = new FullHouse();
    });

    describe("7d7s7hAcAd", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.SEVEN, CardSuit.DIAMONDS),
          new Card(CardRank.SEVEN, CardSuit.SPADES),
          new Card(CardRank.SEVEN, CardSuit.HEARTS),
          new Card(CardRank.ACE, CardSuit.CLUBS),
          new Card(CardRank.ACE, CardSuit.DIAMONDS),
        ]);
      });

      test("should be Full House", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(FullHouse);
      });

      test("should be 7dAc highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.SEVEN, CardSuit.DIAMONDS),
          new Card(CardRank.ACE, CardSuit.CLUBS),
        ]);
      });
    });
  });

  describe("Flush", () => {
    beforeEach(() => {
      type = new Flush();
    });

    describe("2d5dAdJdNd", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.TWO, CardSuit.DIAMONDS),
          new Card(CardRank.FIVE, CardSuit.DIAMONDS),
          new Card(CardRank.ACE, CardSuit.DIAMONDS),
          new Card(CardRank.JACK, CardSuit.DIAMONDS),
          new Card(CardRank.NINE, CardSuit.DIAMONDS),
        ]);
      });

      test("should be Flush", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(Flush);
      });

      test("should be Ad highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.ACE, CardSuit.DIAMONDS),
        ]);
      });
    });
  });

  describe("Straight", () => {
    beforeEach(() => {
      type = new Straight();
    });

    describe("5s2cAdFd3h", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.FIVE, CardSuit.SPADES),
          new Card(CardRank.TWO, CardSuit.CLUBS),
          new Card(CardRank.ACE, CardSuit.DIAMONDS),
          new Card(CardRank.FOUR, CardSuit.DIAMONDS),
          new Card(CardRank.THREE, CardSuit.HEARTS),
        ]);
      });

      test("should be Straight", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(Straight);
      });

      test("should be 5s highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.FIVE, CardSuit.SPADES),
        ]);
      });
    });
  });

  describe("Three Of A Kind", () => {
    beforeEach(() => {
      type = new ThreeOfAKind();
    });

    describe("7s7c7d4d3h", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.SEVEN, CardSuit.SPADES),
          new Card(CardRank.SEVEN, CardSuit.CLUBS),
          new Card(CardRank.SEVEN, CardSuit.DIAMONDS),
          new Card(CardRank.FOUR, CardSuit.DIAMONDS),
          new Card(CardRank.THREE, CardSuit.HEARTS),
        ]);
      });

      test("should be Three Of A Kind", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(ThreeOfAKind);
      });

      test("should be 7s highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.SEVEN, CardSuit.SPADES),
        ]);
      });
    });
  });

  describe("Two Pairs", () => {
    beforeEach(() => {
      type = new TwoPairs();
    });

    describe("7s7cKsKd3h", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.SEVEN, CardSuit.SPADES),
          new Card(CardRank.SEVEN, CardSuit.CLUBS),
          new Card(CardRank.KING, CardSuit.SPADES),
          new Card(CardRank.KING, CardSuit.DIAMONDS),
          new Card(CardRank.THREE, CardSuit.HEARTS),
        ]);
      });

      test("should be Two Pairs", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(TwoPairs);
      });

      test("should be Ks7s highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.KING, CardSuit.SPADES),
          new Card(CardRank.SEVEN, CardSuit.SPADES),
        ]);
      });
    });
  });

  describe("High Card", () => {
    beforeEach(() => {
      type = new HighCard();
    });

    describe("Js7c2s5dTh", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.JACK, CardSuit.SPADES),
          new Card(CardRank.SEVEN, CardSuit.CLUBS),
          new Card(CardRank.TWO, CardSuit.SPADES),
          new Card(CardRank.FIVE, CardSuit.DIAMONDS),
          new Card(CardRank.TEN, CardSuit.HEARTS),
        ]);
      });

      test("should be High Card", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(HighCard);
      });

      test("should be Js highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.JACK, CardSuit.SPADES),
        ]);
      });
    });

    describe("3s7c2s5dTh", () => {
      beforeEach(() => {
        hand = mockFiveCardHand([
          new Card(CardRank.THREE, CardSuit.SPADES),
          new Card(CardRank.SEVEN, CardSuit.CLUBS),
          new Card(CardRank.TWO, CardSuit.SPADES),
          new Card(CardRank.FIVE, CardSuit.DIAMONDS),
          new Card(CardRank.TEN, CardSuit.HEARTS),
        ]);
      });

      test("should be High Card", () => {
        expect(type.check(hand)).toBeTruthy();
        expect(hand.type).toBeInstanceOf(HighCard);
      });

      test("should be Th highest card", () => {
        expect(type.highestCards(hand)).toEqual([
          new Card(CardRank.TEN, CardSuit.HEARTS),
        ]);
      });
    });
  });
});

describe("Hand Comparison", () => {
  test("QsQcQh8d8h should be greater than 9s9c9hKdKh", () => {
    const winner = mockFiveCardHand([
      new Card(CardRank.QUEEN, CardSuit.SPADES),
      new Card(CardRank.QUEEN, CardSuit.CLUBS),
      new Card(CardRank.QUEEN, CardSuit.HEARTS),
      new Card(CardRank.EIGHT, CardSuit.DIAMONDS),
      new Card(CardRank.EIGHT, CardSuit.HEARTS),
    ]);

    const looser = mockFiveCardHand([
      new Card(CardRank.NINE, CardSuit.SPADES),
      new Card(CardRank.NINE, CardSuit.CLUBS),
      new Card(CardRank.NINE, CardSuit.HEARTS),
      new Card(CardRank.KING, CardSuit.DIAMONDS),
      new Card(CardRank.KING, CardSuit.HEARTS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("KsKcKh7d7h should be greater than JdJhQsQcQh", () => {
    const winner = mockFiveCardHand([
      new Card(CardRank.KING, CardSuit.SPADES),
      new Card(CardRank.KING, CardSuit.CLUBS),
      new Card(CardRank.KING, CardSuit.HEARTS),
      new Card(CardRank.SEVEN, CardSuit.DIAMONDS),
      new Card(CardRank.SEVEN, CardSuit.HEARTS),
    ]);

    const looser = mockFiveCardHand([
      new Card(CardRank.JACK, CardSuit.DIAMONDS),
      new Card(CardRank.JACK, CardSuit.HEARTS),
      new Card(CardRank.QUEEN, CardSuit.SPADES),
      new Card(CardRank.QUEEN, CardSuit.CLUBS),
      new Card(CardRank.QUEEN, CardSuit.HEARTS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("KsKcKh7d7h should be greater than 6d6hKsKcKh", () => {
    const winner = mockFiveCardHand([
      new Card(CardRank.KING, CardSuit.SPADES),
      new Card(CardRank.KING, CardSuit.CLUBS),
      new Card(CardRank.KING, CardSuit.HEARTS),
      new Card(CardRank.SEVEN, CardSuit.DIAMONDS),
      new Card(CardRank.SEVEN, CardSuit.HEARTS),
    ]);

    const looser = mockFiveCardHand([
      new Card(CardRank.SIX, CardSuit.DIAMONDS),
      new Card(CardRank.SIX, CardSuit.HEARTS),
      new Card(CardRank.KING, CardSuit.SPADES),
      new Card(CardRank.KING, CardSuit.CLUBS),
      new Card(CardRank.KING, CardSuit.HEARTS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("6h2s3c4h5d should be greater than 3s4cAd2h5h", () => {
    const winner = mockFiveCardHand([
      new Card(CardRank.SIX, CardSuit.HEARTS),
      new Card(CardRank.TWO, CardSuit.SPADES),
      new Card(CardRank.THREE, CardSuit.CLUBS),
      new Card(CardRank.FOUR, CardSuit.HEARTS),
      new Card(CardRank.FIVE, CardSuit.DIAMONDS),
    ]);

    const looser = mockFiveCardHand([
      new Card(CardRank.THREE, CardSuit.SPADES),
      new Card(CardRank.FOUR, CardSuit.CLUBS),
      new Card(CardRank.ACE, CardSuit.DIAMONDS),
      new Card(CardRank.TWO, CardSuit.HEARTS),
      new Card(CardRank.FIVE, CardSuit.HEARTS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("6h2h3h4h5h should be greater than 3s4sAs2s5s", () => {
    const winner = mockFiveCardHand([
      new Card(CardRank.SIX, CardSuit.HEARTS),
      new Card(CardRank.TWO, CardSuit.HEARTS),
      new Card(CardRank.THREE, CardSuit.HEARTS),
      new Card(CardRank.FOUR, CardSuit.HEARTS),
      new Card(CardRank.FIVE, CardSuit.HEARTS),
    ]);

    const looser = mockFiveCardHand([
      new Card(CardRank.THREE, CardSuit.SPADES),
      new Card(CardRank.FOUR, CardSuit.SPADES),
      new Card(CardRank.ACE, CardSuit.SPADES),
      new Card(CardRank.TWO, CardSuit.SPADES),
      new Card(CardRank.FIVE, CardSuit.SPADES),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("ThJsQcKhAd should be greater than 9cTcJdQhKs", () => {
    const winner = mockFiveCardHand([
      new Card(CardRank.TEN, CardSuit.HEARTS),
      new Card(CardRank.JACK, CardSuit.SPADES),
      new Card(CardRank.QUEEN, CardSuit.CLUBS),
      new Card(CardRank.KING, CardSuit.HEARTS),
      new Card(CardRank.ACE, CardSuit.DIAMONDS),
    ]);

    const looser = mockFiveCardHand([
      new Card(CardRank.NINE, CardSuit.CLUBS),
      new Card(CardRank.TEN, CardSuit.CLUBS),
      new Card(CardRank.JACK, CardSuit.DIAMONDS),
      new Card(CardRank.QUEEN, CardSuit.HEARTS),
      new Card(CardRank.KING, CardSuit.SPADES),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.GREATER);
  });

  test("ThTsJcJh2d should be less than JdJs3sTdTc", () => {
    const winner = mockFiveCardHand([
      new Card(CardRank.TEN, CardSuit.HEARTS),
      new Card(CardRank.TEN, CardSuit.SPADES),
      new Card(CardRank.JACK, CardSuit.CLUBS),
      new Card(CardRank.JACK, CardSuit.HEARTS),
      new Card(CardRank.TWO, CardSuit.DIAMONDS),
    ]);

    const looser = mockFiveCardHand([
      new Card(CardRank.JACK, CardSuit.DIAMONDS),
      new Card(CardRank.JACK, CardSuit.SPADES),
      new Card(CardRank.THREE, CardSuit.SPADES),
      new Card(CardRank.TEN, CardSuit.DIAMONDS),
      new Card(CardRank.TEN, CardSuit.CLUBS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.LESS);
  });

  test("ThTsJcJhAd should be equal JdJsAsTdTc", () => {
    const winner = mockFiveCardHand([
      new Card(CardRank.TEN, CardSuit.HEARTS),
      new Card(CardRank.TEN, CardSuit.SPADES),
      new Card(CardRank.JACK, CardSuit.CLUBS),
      new Card(CardRank.JACK, CardSuit.HEARTS),
      new Card(CardRank.ACE, CardSuit.DIAMONDS),
    ]);

    const looser = mockFiveCardHand([
      new Card(CardRank.JACK, CardSuit.DIAMONDS),
      new Card(CardRank.JACK, CardSuit.SPADES),
      new Card(CardRank.ACE, CardSuit.SPADES),
      new Card(CardRank.TEN, CardSuit.DIAMONDS),
      new Card(CardRank.TEN, CardSuit.CLUBS),
    ]);

    expect(winner.compare(looser)).toEqual(CompareResult.EQUAL);
  });
});
