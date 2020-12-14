import { Hand } from "@/entities/hand.entity";
import { GameType } from "@/enums/game-type.enum";
import { TexasHoldemGame } from "@/games/texas-holdem.game";
import { GameParser } from "@/parsers/game.parser";

export class TexasHoldemParser extends GameParser<TexasHoldemGame> {
  constructor() {
    const boardRe = GameParser.getBoardRe(5);
    const handsRe = GameParser.getHandsRe(2);
    super(new RegExp(`^${GameType.TEXAS_HOLDEM} ${boardRe} ${handsRe}$`));
  }

  parse(line: string): TexasHoldemGame {
    const [, board, hands] = this.match(line);
    return new TexasHoldemGame(
      Hand.fromString(board),
      hands.split(/\s+/).map(Hand.fromString)
    );
  }
}
