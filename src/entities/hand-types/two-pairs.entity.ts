import { NOfAKind } from "@/entities/hand-types/n-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Two pairs - two Pair-s
export class TwoPairs extends NOfAKind {
  private constructor(type: HandTypeEnum, n: number, occurs: number) {
    super(type, n, occurs);
  }

  static readonly instance: TwoPairs = new TwoPairs(
    HandTypeEnum.TWO_PAIRS,
    2,
    2
  );
}
