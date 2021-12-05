import { NOfAKind } from "@/entities/hand-types/n-of-a-kind.entity";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";

// Three of a kind - three cards with the same rank
export class ThreeOfAKind extends NOfAKind {
  private constructor(type: HandTypeEnum, n: number, occurs: number) {
    super(type, n, occurs);
  }

  static readonly instance: ThreeOfAKind = new ThreeOfAKind(
    HandTypeEnum.THREE_OF_A_KIND,
    3,
    1
  );
}
