import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import run from "@rollup/plugin-run";
import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";

const dev = process.env.ROLLUP_WATCH === "true";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    sourcemap: true,
  },
  plugins: [commonjs(), resolve(), typescript(), dev && run(), !dev && strip()],
};
