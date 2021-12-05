import { HandType } from "@/entities/hand-type.entity";
import {
  Flush,
  FourOfAKind,
  FullHouse,
  HighCard,
  Pair,
  Straight,
  StraightFlush,
  ThreeOfAKind,
  TwoPairs,
} from "@/entities/hand-types";
import { Hand } from "@/entities/hand.entity";
import { RuntimeException } from "@/exceptions/runtime.exception";

export class HandTypeMatcher {
  // Hand Types in descending order - from strongest to weakest
  static readonly types: readonly HandType[] = [
    StraightFlush.instance,
    FourOfAKind.instance,
    FullHouse.instance,
    Flush.instance,
    Straight.instance,
    ThreeOfAKind.instance,
    TwoPairs.instance,
    Pair.instance,
    HighCard.instance,
  ];

  static match(hand: Hand): HandType {
    const type = HandTypeMatcher.types.find((p) => p.check(hand));

    if (!type) {
      throw new RuntimeException(
        `A type for "${hand}" could not be found, but the High Card should have been a fallback`
      );
    }

    return type;
  }
}
