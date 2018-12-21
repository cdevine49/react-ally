import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import localResolve from "rollup-plugin-local-resolve";
import nodeResolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";

export default [
  // CommonJS
  {
    input: "src/index.js",
    output: { file: "lib/react-ally.js", format: "cjs" },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [babel()]
  },
  // ES
  {
    input: "src/index.js",
    output: { file: "es/react-ally.js", format: "es" },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [babel()]
  },
  // ES for Browsers
  {
    input: "src/index.js",
    output: { file: "es/react-ally.mjs", format: "es" },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      babel(),
      nodeResolve({ jsnext: true }),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  },
  // UMD Development
  {
    input: "src/index.js",
    output: {
      file: "dist/react-ally.js",
      format: "umd",
      name: "react-ally",
      globals: {
        "body-scroll-lock": "BodyScrollLock",
        "prop-types": "propTypes",
        react: "React",
        "react-dom": "ReactDOM"
      }
    },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      nodeResolve({ jsnext: true }),
      babel({ exclude: "node_modules/**" }),
      localResolve(),
      replace({ "process.env.NODE_ENV": JSON.stringify("development") })
    ]
  },
  // UMD Production
  {
    input: "src/index.js",
    output: {
      file: "dist/react-ally.min.js",
      format: "umd",
      name: "react-ally",
      globals: {
        "body-scroll-lock": "BodyScrollLock",
        "prop-types": "propTypes",
        react: "React",
        "react-dom": "ReactDOM"
      }
    },
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
      nodeResolve({ jsnext: true }),
      babel({ exclude: "node_modules/**" }),
      localResolve(),
      replace({ "process.env.NODE_ENV": JSON.stringify("production") }),
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ]
  }
];
