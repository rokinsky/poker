import { Card } from "@/entities/card.entity";
import { CardRank } from "@/enums/card-rank.enum";
import { CardSuit } from "@/enums/card-suit.enum";
import { SortOrder } from "@/enums/sort-order.enum";
import { RuntimeException } from "@/exceptions/runtime.exception";
import { distinct, groupBy, max, sort } from "@/utils";

export class Hand {
  constructor(private readonly _cards: readonly Card[]) {}

  get cards(): readonly Card[] {
    return this._cards;
  }

  get suits(): readonly CardSuit[] {
    return distinct(this.cards.map((card) => card.suit));
  }

  get sortedCards(): readonly Card[] {
    return this.sortCards(SortOrder.DESC);
  }

  get sortedRanks(): readonly CardRank[] {
    return this.sortedCards.map((card) => card.rank);
  }

  get highestCard(): Card {
    return max(this.cards);
  }

  get groupedCards(): Map<CardRank, Card[]> {
    return groupBy(this.cards, (card) => card.rank);
  }

  get distinctSortedRanks(): readonly CardRank[] {
    return distinct([...this.sortedRanks]);
  }

  static fromString(hand: string): Hand {
    // Split the string by 2 chars
    const cards = hand.match(/.{2}/g);

    if (!cards) {
      throw new RuntimeException(
        `The string "${hand}" doesn't contain any cards`
      );
    }

    return new Hand(cards.map(Card.fromString));
  }

  sortCards(ordering: SortOrder = SortOrder.ASC): Card[] {
    return sort([...this.cards], ordering);
  }

  reduceCardsByRankGroups<T>(
    func: (acc: T, value: Card[], index: number) => T,
    init: T
  ): T {
    return Array.from(this.groupedCards.values()).reduce(func, init);
  }

  countRankGroupsBySize(n: number): number {
    return this.reduceCardsByRankGroups(
      (acc: number, cards): number => acc + Number(cards.length === n),
      0
    );
  }

  highestFromRankGroupsBySize(n: number): Card[] {
    return this.reduceCardsByRankGroups(
      (acc, cards) => (cards.length === n ? [...acc, cards[0]] : acc),
      [] as Card[]
    );
  }

  toString(): string {
    return this.cards.map((card) => card.toString()).join("");
  }
}
