import { NOfAKind } from "@/entities/hand-types/n-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Two pairs - two Pair-s
export class TwoPairs extends NOfAKind {
  constructor() {
    super(HandTypeEnum.TWO_PAIRS, 2, 2);
  }
}
