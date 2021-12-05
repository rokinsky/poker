import { Hand } from "@/entities/hand.entity";
import { GameType } from "@/enums/game-type.enum";
import { TexasHoldemGame } from "@/games/texas-holdem.game";
import { GameParser } from "@/parsers/game.parser";

export class TexasHoldemParser extends GameParser<TexasHoldemGame> {
  private constructor(regex: RegExp) {
    super(regex);
  }

  private static _instance: TexasHoldemParser;

  static {
    const boardRe = GameParser.getBoardRe(5);
    const handsRe = GameParser.getHandsRe(2);
    TexasHoldemParser._instance = new TexasHoldemParser(
      new RegExp(`^${GameType.TEXAS_HOLDEM} ${boardRe} ${handsRe}$`)
    );
  }

  static get instance(): TexasHoldemParser {
    return TexasHoldemParser._instance;
  }

  parse(line: string): TexasHoldemGame {
    const [, board, hands] = this.match(line);
    return new TexasHoldemGame(
      Hand.fromString(board),
      hands.split(/\s+/).map(Hand.fromString)
    );
  }
}
