import { Card } from "@/entities/card.entity";
import { HandType } from "@/entities/hand-type.entity";
import { Hand } from "@/entities/hand.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

export abstract class And extends HandType {
  protected constructor(
    type: HandTypeEnum,
    private readonly _strong: HandType,
    private readonly _weak: HandType
  ) {
    super(type);
  }

  get strong(): HandType {
    return this._strong;
  }

  get weak(): HandType {
    return this._weak;
  }

  check(hand: Hand): boolean {
    return this.strong.check(hand) && this.weak.check(hand);
  }

  highestCards(hand: Hand): Card[] {
    return [...this.strong.highestCards(hand), ...this.weak.highestCards(hand)];
  }
}
