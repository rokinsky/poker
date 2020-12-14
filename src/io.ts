import { createInterface, Interface } from "readline";

export class IO {
  private readonly _in: Interface;
  private readonly _out: NodeJS.WritableStream;

  constructor(input: NodeJS.ReadableStream, output: NodeJS.WritableStream) {
    this._in = createInterface({
      input: input,
      crlfDelay: Infinity,
    });
    this._out = output;
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
