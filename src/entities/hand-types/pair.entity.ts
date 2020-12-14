import { NOfAKind } from "@/entities/hand-types/n-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Pair - two cards of the same rank
export class Pair extends NOfAKind {
  constructor() {
    super(HandTypeEnum.PAIR, 2, 1);
  }
}
