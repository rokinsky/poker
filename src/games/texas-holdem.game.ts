import { FiveCardHand } from "@/entities/five-card-hand.entity";
import { Hand } from "@/entities/hand.entity";
import { Game } from "@/interfaces/game.interface";
import { kCombinations, max } from "@/utils";

export class TexasHoldemGame implements Game {
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
      // Make possible subsets of 5 cards from the 7 cards
      // which are formed by 5 board cards and 2 hand cards.
      const initial = [...this.board.cards, ...hand.cards];
      const combinations = kCombinations(initial, 5);

      // Select the best possible value out of all combinations
      return max(
        combinations.map((cards) => new FiveCardHand(hand.toString(), cards))
      );
    });
  }
}
