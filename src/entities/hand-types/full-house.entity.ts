import { And } from "@/entities/hand-types/and.entity";
import { Pair } from "@/entities/hand-types/pair.entity";
import { ThreeOfAKind } from "@/entities/hand-types/three-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Full House - a combination of Three of a kind and a Pair
export class FullHouse extends And {
  constructor() {
    super(HandTypeEnum.FULL_HOUSE, new ThreeOfAKind(), new Pair());
  }
}
