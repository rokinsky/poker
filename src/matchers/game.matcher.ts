import { InvalidInputException } from "@/exceptions/invalid-input.exception";
import { Game } from "@/interfaces/game.interface";
import { Parser } from "@/interfaces/parser.interface";
import { FiveCardDrawParser } from "@/parsers/five-card-draw.parser";
import { OmahaHoldemParser } from "@/parsers/omaha-holdem.parser";
import { TexasHoldemParser } from "@/parsers/texas-holdem.parser";

export class GameMatcher {
  static readonly parsers: readonly Parser<Game>[] = [
    TexasHoldemParser.instance,
    OmahaHoldemParser.instance,
    FiveCardDrawParser.instance,
  ];

  static match(line: string): Game {
    const parser = GameMatcher.parsers.find((p) => p.check(line));

    if (!parser) {
      throw new InvalidInputException();
    }

    return parser.parse(line);
  }
}
