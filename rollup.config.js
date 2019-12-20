import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

const base = {
  plugins: [
    typescript(),
    uglify()
  ]
};

export default [
  Object.assign(
    {},
    base,
    {
      input: "src/index.ts",
      output: {
        format: "cjs",
        file: "dist/index.js"
      }
    }
  )
];
