import { Evaluator } from "@/evaluator";
import { IO } from "@/io";

const io = IO.of(process.stdin, process.stdout);

const main = async () => {
  for await (const line of io) {
    try {
      io.writeln(Evaluator.evaluate(line));
    } catch (err: unknown) {
      if (err instanceof Error) {
        io.writeln(err.message);
      }
    }
  }
};

main().catch(io.writeln);
