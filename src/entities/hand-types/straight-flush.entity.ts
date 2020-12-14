import { And } from "@/entities/hand-types/and.entity";
import { Flush } from "@/entities/hand-types/flush.entity";
import { Straight } from "@/entities/hand-types/straight.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Straight Flush - a Straight which is also a Flush
export class StraightFlush extends And {
  constructor() {
    super(HandTypeEnum.STRAIGHT_FLUSH, new Straight(), new Flush());
  }
}
