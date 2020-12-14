import { BaseException } from "@/exceptions/base.exception";
import { InvalidException } from "@/exceptions/invalid.exception";

export class InvalidDataException extends InvalidException {
  constructor(message?: string) {
    super("Data", BaseException.suffix(message));
  }
}
