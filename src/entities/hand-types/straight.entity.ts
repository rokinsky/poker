import { Card } from "@/entities/card.entity";
import { HandType } from "@/entities/hand-type.entity";
import { Hand } from "@/entities/hand.entity";
import { CardRank } from "@/enums/card-rank.enum";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";
import { arrayEquals } from "@/utils";

// Straight - a sequence of 5 cards of consecutive rank (note an exception - A can both precede 2 and follow K)
export class Straight extends HandType {
  constructor() {
    super(HandTypeEnum.STRAIGHT);
  }

  check(hand: Hand): boolean {
    const ranks = hand.distinctSortedRanks;

    if (ranks.length !== 5) {
      return false;
    }

    const distance = ranks[0] - ranks[ranks.length - 1];
    const isLowestStraight = arrayEquals(ranks, [
      CardRank.ACE,
      CardRank.FIVE,
      CardRank.FOUR,
      CardRank.THREE,
      CardRank.TWO,
    ]);

    return distance === 4 || isLowestStraight;
  }

  highestCards(hand: Hand): Card[] {
    const sorted = hand.sortedCards;
    const [first, second, , , last] = sorted;

    const isLowestStraight =
      first.rank === CardRank.ACE && last.rank === CardRank.TWO;

    return isLowestStraight ? [second] : [first];
  }
}
