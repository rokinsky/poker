import { SortOrder } from "@/enums/sort-order.enum";
import { GameMatcher } from "@/matchers/game.matcher";
import { compareWithLex, sort, stringify } from "@/utils";

export class Evaluator {
  static evaluate(line: string): string {
    const game = GameMatcher.match(line);
    const hands = game.execute();
    return stringify(sort(hands, SortOrder.ASC, compareWithLex));
  }
}
