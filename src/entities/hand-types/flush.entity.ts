import { Card } from "@/entities/card.entity";
import { HandType } from "@/entities/hand-type.entity";
import { Hand } from "@/entities/hand.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Flush - 5 cards of the same suit
export class Flush extends HandType {
  constructor() {
    super(HandTypeEnum.FLUSH);
  }

  check(hand: Hand): boolean {
    return hand.suits.length === 1;
  }

  highestCards(hand: Hand): Card[] {
    return [hand.highestCard];
  }
}
