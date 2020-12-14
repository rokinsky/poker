import { Evaluator } from "@/evaluator";
import { IO } from "@/io";

const io = new IO(process.stdin, process.stdout);

const main = async () => {
  for await (const line of io) {
    try {
      io.writeln(Evaluator.evaluate(line));
    } catch (err) {
      io.writeln(err.message);
    }
  }
};

main().catch(io.writeln);
