import { Card } from "@/entities/card.entity";
import { HandType } from "@/entities/hand-type.entity";
import { Hand } from "@/entities/hand.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// High card - the "fallback" in case no other hand value rule applies
export class HighCard extends HandType {
  constructor() {
    super(HandTypeEnum.HIGH_CARD);
  }

  check(_hand: Hand): boolean {
    return true;
  }

  highestCards(hand: Hand): Card[] {
    return [hand.highestCard];
  }
}
