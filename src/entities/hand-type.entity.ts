import { Card } from "@/entities/card.entity";
import { Hand } from "@/entities/hand.entity";
import { CompareResult } from "@/enums/compare-result.enum";
import { HandType as HandTypeEnum } from "@/enums/hand-type.enum";
import { Comparable } from "@/interfaces/comparable.interface";
import { comparePrimitives } from "@/utils";

export abstract class HandType implements Comparable<HandType> {
  protected constructor(private readonly _type: HandTypeEnum) {}

  get type(): HandTypeEnum {
    return this._type;
  }

  compare(other: HandType): CompareResult {
    return comparePrimitives(this.type, other.type);
  }

  toString(): string {
    return HandTypeEnum[this.type];
  }

  abstract check(hand: Hand): boolean;

  abstract highestCards(hand: Hand): Card[];
}
