import { RuntimeException } from "@/exceptions/runtime.exception";
import { Parser } from "@/interfaces/parser.interface";
import { CardValidator } from "@/validators/card.validator";

export abstract class GameParser<T> implements Parser<T> {
  private static readonly cardRe = "(?:[2-9TJQKA][cdhs])";

  protected constructor(protected readonly _regex: RegExp) {}

  get regex(): RegExp {
    return this._regex;
  }

  protected static getBoardRe(nCards: number) {
    return `(?<board>${GameParser.getCardsRe(nCards)})`;
  }

  protected static getHandsRe(nCards: number) {
    const handRe = GameParser.getCardsRe(nCards);
    return `(?<hands>${handRe}(?: ${handRe})*)`;
  }

  private static getCardsRe(n: number) {
    return `${GameParser.cardRe}{${n}}`;
  }

  check(line: string): boolean {
    return this.regex.test(line) && CardValidator.validate(line);
  }

  match(line: string): RegExpMatchArray {
    const match = line.match(this.regex);

    if (!match) {
      throw new RuntimeException(
        `line "${line}" isn't matched to "${this.regex}"`
      );
    }

    return match;
  }

  abstract parse(line: string): T;
}
