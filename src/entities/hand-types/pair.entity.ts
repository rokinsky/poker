import { NOfAKind } from "@/entities/hand-types/n-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Pair - two cards of the same rank
export class Pair extends NOfAKind {
  private constructor(type: HandTypeEnum, n: number, occurs: number) {
    super(type, n, occurs);
  }

  static readonly instance: Pair = new Pair(HandTypeEnum.PAIR, 2, 1);
}
