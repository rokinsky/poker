import { HandType } from "@/entities/hand-type.entity";
import { And } from "@/entities/hand-types/and.entity";
import { Pair } from "@/entities/hand-types/pair.entity";
import { ThreeOfAKind } from "@/entities/hand-types/three-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Full House - a combination of Three of a kind and a Pair
export class FullHouse extends And {
  private constructor(type: HandTypeEnum, strong: HandType, weak: HandType) {
    super(type, strong, weak);
  }

  static readonly instance: FullHouse = new FullHouse(
    HandTypeEnum.FULL_HOUSE,
    ThreeOfAKind.instance,
    Pair.instance
  );
}
