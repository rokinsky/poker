export abstract class BaseException extends Error {
  static readonly prefix = "Error:";

  protected constructor(...messages: string[]) {
    super([BaseException.prefix, ...messages].filter(Boolean).join(" "));
  }

  static suffix(message?: string): string {
    return message ? `(${message})` : "";
  }
}
