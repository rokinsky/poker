import { Card } from "@/entities/card.entity";
import { HandType } from "@/entities/hand-type.entity";
import { Hand } from "@/entities/hand.entity";
import { CompareResult } from "@/enums/compare-result.enum";
import { SortOrder } from "@/enums/sort-order.enum";
import { Comparable } from "@/interfaces/comparable.interface";
import { HandTypeMatcher } from "@/matchers/hand-type.matcher";
import { compare, zip } from "@/utils";

export class FiveCardHand extends Hand implements Comparable<FiveCardHand> {
  private readonly _values: readonly [type: HandType, ...cards: Card[]];

  // `id` means the string representation of the player's original hand
  constructor(private _id: string, cards: readonly Card[]) {
    super(cards);
    const type = this.type;
    // Used for comparing five card hand values, memoized and sorted by priority DESC
    this._values = [
      // First compare hand types
      type,

      // In case of ties the ranks of the cards forming the combinations decide the highest value.
      ...type.highestCards(this),

      // In case of further ties, the ranks of the remaining cards decide the highest value.
      ...this.sortCards(SortOrder.DESC),
    ];
  }

  get type(): HandType {
    return HandTypeMatcher.match(this);
  }

  get values(): readonly [HandType, ...Card[]] {
    return this._values;
  }

  get id(): string {
    return this._id;
  }

  compare(other: FiveCardHand): CompareResult {
    // Compare until values are equal
    return zip(this.values, other.values).reduce(
      (memo: CompareResult, [a, b]) =>
        memo === CompareResult.EQUAL ? compare(a, b) : memo,
      CompareResult.EQUAL
    );
  }

  toString(): string {
    return this.id;
  }
}
