import { FiveCardHand } from "@/entities/five-card-hand.entity";
import { Hand } from "@/entities/hand.entity";
import { Game } from "@/interfaces/game.interface";

export class FiveCardDrawGame implements Game {
  constructor(private readonly _hands: readonly Hand[]) {}

  get hands(): readonly Hand[] {
    return this._hands;
  }

  execute(): FiveCardHand[] {
    // A value of a Five Card Draw hand is the value of the 5 hand cards.
    return this.hands.map(
      (hand) => new FiveCardHand(hand.toString(), hand.cards)
    );
  }
}
