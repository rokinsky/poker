import { BaseException } from "@/exceptions/base.exception";

export class RuntimeException extends BaseException {
  constructor(message?: string) {
    super("Runtime", BaseException.suffix(message));
  }
}
