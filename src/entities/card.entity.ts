import { CardRank } from "@/enums/card-rank.enum";
import { CardSuit } from "@/enums/card-suit.enum";
import { CompareResult } from "@/enums/compare-result.enum";
import { Comparable } from "@/interfaces/comparable.interface";
import { comparePrimitives } from "@/utils";

export class Card implements Comparable<Card> {
  private static readonly ranks: readonly string[] = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
  ];

  private static readonly suits: readonly string[] = ["s", "c", "d", "h"];

  static readonly maxNCards = Card.ranks.length * Card.suits.length;

  constructor(
    private readonly _rank: CardRank,
    private readonly _suit: CardSuit
  ) {}

  get rank(): CardRank {
    return this._rank;
  }

  get suit(): CardSuit {
    return this._suit;
  }

  static fromString([rank, suit]: string): Card {
    return new Card(Card.charToRank(rank), Card.charToSuit(suit));
  }

  private static readonly charToRank = (ch: string): CardRank =>
    Card.ranks.indexOf(ch);

  private static readonly charToSuit = (ch: string): CardSuit =>
    Card.suits.indexOf(ch);

  private static readonly rankToChar = (rank: CardRank): string =>
    Card.ranks[rank];

  private static readonly suitToChar = (suit: CardSuit): string =>
    Card.suits[suit];

  compare(other: Card): CompareResult {
    return comparePrimitives(this.rank, other.rank);
  }

  toString(): string {
    return `${Card.rankToChar(this.rank)}${Card.suitToChar(this.suit)}`;
  }
}
