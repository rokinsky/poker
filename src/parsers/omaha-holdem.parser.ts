import { Hand } from "@/entities/hand.entity";
import { GameType } from "@/enums/game-type.enum";
import { OmahaHoldemGame } from "@/games/omaha-holdem.game";
import { GameParser } from "@/parsers/game.parser";

export class OmahaHoldemParser extends GameParser<OmahaHoldemGame> {
  constructor() {
    const boardRe = GameParser.getBoardRe(5);
    const handsRe = GameParser.getHandsRe(4);
    super(new RegExp(`^${GameType.OMAHA_HOLDEM} ${boardRe} ${handsRe}$`));
  }

  parse(line: string): OmahaHoldemGame {
    const [, board, hands] = this.match(line);
    return new OmahaHoldemGame(
      Hand.fromString(board),
      hands.split(/\s+/).map(Hand.fromString)
    );
  }
}
