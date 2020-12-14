import { BaseException } from "@/exceptions/base.exception";
import { InvalidException } from "@/exceptions/invalid.exception";

export class InvalidInputException extends InvalidException {
  constructor(message?: string) {
    super("Input", BaseException.suffix(message));
  }
}
