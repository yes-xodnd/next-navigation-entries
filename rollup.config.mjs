import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import dts from "rollup-plugin-dts";
import pkg from "./package.json" assert { type: "json" };
import del from "rollup-plugin-delete";
import PeerDepsExternal from "rollup-plugin-peer-deps-external";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

const config = [
  {
    input: "./src/index.ts",
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      PeerDepsExternal(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.ts"],
        useTsconfigDeclarationDir: true,
      }),
      babel({
        babelHelpers: "bundled",
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ],
        extensions,
      }),
    ],
  },
  {
    input: "./dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts(), del({ hook: "buildEnd", targets: "./dist/types" })],
  },
];

export default config;
