import { HandType } from "@/entities/hand-type.entity";
import { And } from "@/entities/hand-types/and.entity";
import { Flush } from "@/entities/hand-types/flush.entity";
import { Straight } from "@/entities/hand-types/straight.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Straight Flush - a Straight which is also a Flush
export class StraightFlush extends And {
  private constructor(type: HandTypeEnum, strong: HandType, weak: HandType) {
    super(type, strong, weak);
  }

  static readonly instance: StraightFlush = new StraightFlush(
    HandTypeEnum.STRAIGHT_FLUSH,
    Straight.instance,
    Flush.instance
  );
}
