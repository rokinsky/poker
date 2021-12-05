import { Hand } from "@/entities/hand.entity";
import { GameType } from "@/enums/game-type.enum";
import { FiveCardDrawGame } from "@/games/five-card-draw.game";
import { GameParser } from "@/parsers/game.parser";

export class FiveCardDrawParser extends GameParser<FiveCardDrawGame> {
  private constructor(regex: RegExp) {
    super(regex);
  }

  private static _instance: FiveCardDrawParser;

  static {
    const handsRe = GameParser.getHandsRe(5);
    FiveCardDrawParser._instance = new FiveCardDrawParser(
      new RegExp(`^${GameType.FIVE_CARD_DRAW} ${handsRe}$`)
    );
  }

  static get instance(): FiveCardDrawParser {
    return FiveCardDrawParser._instance;
  }

  parse(line: string): FiveCardDrawGame {
    const [, hands] = this.match(line);
    return new FiveCardDrawGame(hands.split(/\s+/).map(Hand.fromString));
  }
}
