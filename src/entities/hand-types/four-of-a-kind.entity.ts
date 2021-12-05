import { NOfAKind } from "@/entities/hand-types/n-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Four of a kind - Four cards of the same rank
export class FourOfAKind extends NOfAKind {
  private constructor(type: HandTypeEnum, n: number, occurs: number) {
    super(type, n, occurs);
  }

  static readonly instance: FourOfAKind = new FourOfAKind(
    HandTypeEnum.FOUR_OF_A_KIND,
    4,
    1
  );
}
