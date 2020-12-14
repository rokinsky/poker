import { FiveCardHand } from "@/entities/five-card-hand.entity";
import { Hand } from "@/entities/hand.entity";
import { Game } from "@/interfaces/game.interface";
import { cartesian, kCombinations, max } from "@/utils";

export class OmahaHoldemGame implements Game {
  constructor(
    private readonly _board: Hand,
    private readonly _hands: readonly Hand[]
  ) {}

  get board(): Hand {
    return this._board;
  }

  get hands(): readonly Hand[] {
    return this._hands;
  }

  execute(): FiveCardHand[] {
    return this.hands.map((hand) => {
      // Make all possible subsets of 5 cards from the 9 cards
      // which are formed by 3 out of 5 board cards and 2 out of 4 hand cards.
      const combinations = cartesian(
        kCombinations(hand.cards, 2),
        kCombinations(this.board.cards, 3)
      );

      // Select the best possible value out of all combinations
      return max(
        combinations.map((cards) => new FiveCardHand(hand.toString(), cards))
      );
    });
  }
}
