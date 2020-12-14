import { Hand } from "@/entities/hand.entity";
import { GameType } from "@/enums/game-type.enum";
import { FiveCardDrawGame } from "@/games/five-card-draw.game";
import { GameParser } from "@/parsers/game.parser";

export class FiveCardDrawParser extends GameParser<FiveCardDrawGame> {
  constructor() {
    const handsRe = GameParser.getHandsRe(5);
    super(new RegExp(`^${GameType.FIVE_CARD_DRAW} ${handsRe}$`));
  }

  parse(line: string): FiveCardDrawGame {
    const [, hands] = this.match(line);
    return new FiveCardDrawGame(hands.split(/\s+/).map(Hand.fromString));
  }
}
