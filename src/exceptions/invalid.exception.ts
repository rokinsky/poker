import { BaseException } from "@/exceptions/base.exception";

export abstract class InvalidException extends BaseException {
  protected constructor(...messages: string[]) {
    super("Invalid", ...messages);
  }
}
