import { Card } from "@/entities/card.entity";
import { HandType } from "@/entities/hand-type.entity";
import { Hand } from "@/entities/hand.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";
import { SortOrder } from "@/enums/sort-order.enum";
import { sort } from "@/utils";

export abstract class NOfAKind extends HandType {
  protected constructor(
    type: HandTypeEnum,
    private readonly _n: number,
    private readonly _occurs: number
  ) {
    super(type);
  }

  get n(): number {
    return this._n;
  }

  get occurs(): number {
    return this._occurs;
  }

  check(hand: Hand): boolean {
    const occurs = hand.countRankGroupsBySize(this.n);
    return occurs >= this.occurs;
  }

  highestCards(hand: Hand): Card[] {
    const kinds = hand.highestFromRankGroupsBySize(this.n);
    return sort(kinds, SortOrder.DESC);
  }
}
