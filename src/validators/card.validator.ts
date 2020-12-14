import { Card } from "@/entities/card.entity";
import { InvalidDataException } from "@/exceptions/invalid-data.exception";
import { RuntimeException } from "@/exceptions/runtime.exception";
import { distinct } from "@/utils";

export class CardValidator {
  static validate(line: string): boolean {
    // Drop the game name, remove the spaces and split the string by 2 chars
    const cards = line.split(/\s+/).slice(1).join("").match(/.{2}/g);

    if (!cards) {
      throw new RuntimeException(
        `The string "${line}" doesn't contain any cards`
      );
    }

    const distinctCards = distinct(cards);

    if (cards.length !== distinctCards.length) {
      throw new InvalidDataException("Cards contain duplicates");
    }

    if (cards.length > Card.maxNCards) {
      throw new InvalidDataException("The number of cards exceeded");
    }

    return true;
  }
}
