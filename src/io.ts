import { createInterface, Interface } from "readline";

export class IO {
  private constructor(
    private readonly _in: Interface,
    private readonly _out: NodeJS.WritableStream
  ) {}

  static of(input: NodeJS.ReadableStream, output: NodeJS.WritableStream): IO {
    return new IO(
      createInterface({
        input: input,
        crlfDelay: Infinity,
      }),
      output
    );
  }

  get in(): Interface {
    return this._in;
  }

  get out(): NodeJS.WritableStream {
    return this._out;
  }

  writeln(...args: string[]): void {
    this.out.write(`${args.join(" ")}\n`);
  }

  [Symbol.asyncIterator](): AsyncIterableIterator<string> {
    return this.in[Symbol.asyncIterator]();
  }
}
