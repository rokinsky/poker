import { NOfAKind } from "@/entities/hand-types/n-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Four of a kind - Four cards of the same rank
export class FourOfAKind extends NOfAKind {
  constructor() {
    super(HandTypeEnum.FOUR_OF_A_KIND, 4, 1);
  }
}
